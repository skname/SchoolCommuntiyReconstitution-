import {getStorage, setStorage} from './Storage';
import {down} from './down';
let urls = [];
export async function imgStorage (icons, storageName) {
  try{
    await getStorage(storageName);
    return;
  }catch{
    let l = icons.length;
    for(let i= 0;i<l;i++){
      urls.push(await down(icons[i]));
    }
    await setStorage(storageName, urls);
    urls = [];
    }
}
export async function getImgs(storageName){
  try{
    let icons = await getStorage(storageName);
    this.setData({
      icons
    })
  }catch{
    return;
  }
}