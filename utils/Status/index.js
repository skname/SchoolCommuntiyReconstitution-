import {req} from '../Req';
import { getStorage } from '../Storage';
export async function isStop (openid) {
  const isfenghao = await req(`/isfenghao?openid=${openid}`,'get');
  return isfenghao;
}

export async function isLogin(){
  var statue = undefined;
  try{
    statue = await getStorage('userInfo');
  }catch{
    statue = false;
  }finally{
    return statue
  }
}