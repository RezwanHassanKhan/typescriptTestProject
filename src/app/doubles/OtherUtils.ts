import { v4 } from "uuid";

export type stringInfo = {
    lowerCase: string,
    upperCase: string,
    characters: string[],
    length: number,
    extraInfo: Object
}

//For Checking Mocking Modules
export function toUpperCase(arg: string) 
{
    return arg.toUpperCase()
}
export function toLowerCaseId(arg : string)
{
    return arg.toLowerCase() + v4()

}


///FOR CHECKING STUBS

export function calculateComplexity(stringInfo: stringInfo){
    return Object.keys(stringInfo.extraInfo).length * stringInfo.length
}

type LoggerServiceCallBack = (arg:string) => void ; 


//FOR CHECKING FAKES AND MOCKS
export function toUpperCaseWithCb(arg: string , callback : LoggerServiceCallBack )
{
    
    if(!arg)
        {
            callback('Invalid Argument')
            return 
        }

    callback(`called function with ${arg}`)
    return arg.toUpperCase()
}


//for Checking SPIES
export class OtherStringUtils
{
    public upperCase(arg : string){
        return arg.toUpperCase() 
    }
    public logstring(arg : string )
    {
        console.log(arg)
    }
    public callExternalService()
    {
        console.log("Calling External Service")
    }
}
