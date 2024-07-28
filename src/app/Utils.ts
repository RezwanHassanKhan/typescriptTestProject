export class StringUtils
{
    public toLowerCase(arg: string)
    {
        if(!arg)
        {
            throw new Error('Invalid Argument')
        }
        return toLowerCase(arg);
    }
    
}


export function toLowerCase(arg:string)
{
    return arg.toLowerCase();
}

export function toUpperCase(arg : string)
{
    return arg.toUpperCase();
}

export type stringInfo = {
    lowerCase: string,
    upperCase: string,
    characters: string[],
    length: number,
    extraInfo: Object | undefined
}

export function getStringInfo(arg: string): stringInfo{
    return {
        lowerCase: arg.toLowerCase(),
        upperCase: arg.toUpperCase(),
        characters: Array.from(arg),
        length: arg.length,
        extraInfo: {}
    }
}