export function toDo(...args:any[]){
    console.log('[TODO]',args);
}

export function debounce(callback:(...args:never[]) => void,config:{timeout:number}){
    let timoutId: ReturnType<typeof setTimeout> | number = 0;
    return (...args:never[]) => {
        clearTimeout(timoutId as number);
        timoutId = setTimeout(() => {
            callback(...args);
        },config.timeout)
    }
}