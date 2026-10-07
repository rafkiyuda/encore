from PIL import Image
import numpy as np, os
from collections import deque
src=Image.open(__import__('sys').argv[1]).convert('RGB')
im=np.array(src).astype(int); H,W,_=im.shape
mn=im.min(axis=2)
bg=mn>=236

def label(mask):
    lab=np.zeros(mask.shape,np.int32); n=0; sizes=[0]
    h,w=mask.shape
    for y0,x0 in zip(*np.nonzero(mask)):
        if lab[y0,x0]:continue
        n+=1; q=deque([(y0,x0)]); lab[y0,x0]=n; c=0
        while q:
            y,x=q.popleft(); c+=1
            for dy,dx in ((1,0),(-1,0),(0,1),(0,-1)):
                yy,xx=y+dy,x+dx
                if 0<=yy<h and 0<=xx<w and mask[yy,xx] and not lab[yy,xx]:
                    lab[yy,xx]=n; q.append((yy,xx))
        sizes.append(c)
    return lab,np.array(sizes)

bl,bs=label(bg)
border=set(np.unique(np.concatenate([bl[0],bl[-1],bl[:,0],bl[:,-1]])))-{0}
outside=np.isin(bl,list(border)) | np.isin(bl, np.nonzero(bs>700)[0])
# feather near outside
near=outside.copy()
for _ in range(2):
    n2=near.copy(); n2[1:]|=near[:-1]; n2[:-1]|=near[1:]; n2[:,1:]|=near[:,:-1]; n2[:,:-1]|=near[:,1:]; near=n2
alpha=np.full((H,W),255.0)
ramp=np.clip((246-mn)/(246-200),0,1)*255
alpha=np.where(near, np.minimum(alpha,ramp), alpha)
alpha[outside]=0
fg=alpha>20
fg[790:793,340:600]=False
fl,fs=label(fg)
# grid
rows=[0,296,556,795,H]
def runs(v,thr=1,minlen=3):
    out=[];s=None
    for i,x in enumerate(v):
        if x>thr and s is None:s=i
        if x<=thr and s is not None:
            if i-s>=minlen:out.append((s,i))
            s=None
    if s is not None:out.append((s,len(v)))
    return out
cells=[]
for r in range(4):
    a,b=rows[r],rows[r+1]
    cr=runs(fg[a+20:b-20].sum(axis=0))
    cr=[c for c in cr if c[1]-c[0]>60]
    assert len(cr)==5,(r,cr)
    cx=[(c[0]+c[1])/2 for c in cr]
    cells.append(cx)
ys,xs=np.nonzero(fl)
ids=fl[ys,xs]
cnt=np.bincount(ids); sy=np.bincount(ids,ys); sx=np.bincount(ids,xs)
assign=np.zeros(len(cnt),int)-1
for i in range(1,len(cnt)):
    if cnt[i]<30: continue
    cy,cx=sy[i]/cnt[i],sx[i]/cnt[i]
    r=max(k for k in range(4) if cy>=rows[k])
    c=int(np.argmin([abs(cx-v) for v in cells[r]]))
    assign[i]=r*5+c
out=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','public','brand','mascot'); os.makedirs(out,exist_ok=True)
rgba=np.dstack([im,alpha]).astype(np.uint8)
for k in range(20):
    m=np.isin(fl,np.nonzero(assign==k)[0])
    yy,xx=np.nonzero(m)
    y0,y1,x0,x1=yy.min(),yy.max()+1,xx.min(),xx.max()+1
    crop=rgba[y0:y1,x0:x1].copy(); crop[...,3]=np.where(m[y0:y1,x0:x1],crop[...,3],0)
    img=Image.fromarray(crop,'RGBA')
    if img.width>600: img=img.resize((600,round(img.height*600/img.width)),Image.LANCZOS)
    p=f'{out}/mascot-{k+1:02d}'
    img.save(p+'.webp',quality=86,method=6); img.save(p+'.png',optimize=True)
    print(k+1,img.size)
