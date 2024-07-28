import { calculateComplexity , OtherStringUtils, toUpperCaseWithCb} from "../app/doubles/OtherUtils";

describe.skip('OtherUtils Test Suite', ()=> 
    {
       
       //FOR CHECKING STUBS 
        it('Calculates Complexity' , ()=>
            {
                const someInfo = 
                {
                    length : 5,
                    extraInfo : 
                    {
                        vowes :  '3',
                        novowels : '4'
                    }
                }
                
                const actual_complexity = calculateComplexity(someInfo as any)
                expect(actual_complexity).toBe(10)            

            })

        //FOR working with FAKES
        //disdvantage of using fake is that we dont have tracks how much time a function called that we fake 
        //we skip what that fakes function return ( we fake it cz we know that return is not important for our test)
        it('Uppercase - calls callback for invalid arguments', () => 
            {
                //faking the actual calback function and putting an empty () ={}(empty body of a function)
                const actual = toUpperCaseWithCb('',()=>{}) 
                expect(actual).toBeUndefined()

            })

        it('Uppercase - calls Callback for valid arguments', () => 
            {
                const actual = toUpperCaseWithCb('abc',()=>{})
                expect(actual).toBe('ABC')

            })


        //FOR CHECKING MOKES
        //1. Building Our Own Mock Function
        describe('Tracking Callbacks', ()=>
            {
                let cbArgs : string[] = []
                let timesCalled = 0

                function callBackMock(arg : string)
                {
                    cbArgs.push(arg)
                    timesCalled++

                }
                afterEach(()=>
                    {
                        cbArgs = [];
                        timesCalled = 0 ; 
                    })
                 

                it('Uppercase - calls Callback for invalid arguments', () => 
                    {
                        const actual = toUpperCaseWithCb('', callBackMock)
                        expect(actual).toBeUndefined()
                        expect(cbArgs).toContain('Invalid Argument')
                        expect(timesCalled).toBe(1)
        
                    }) 
                
                it ('Uppercase - calls Callback for valid arguments', () => 
                    {
                        const actual = toUpperCaseWithCb('abc',callBackMock)
                        expect(actual).toBe('ABC')
                        expect(cbArgs).toContain('called function with abc')
                        expect(timesCalled).toBe(1)
        
                    }) 
            })

        //2. Jest Mock Function 
        describe('Tracking Callbacks with Jest',()=>
            {
                const callBackMock =jest.fn()
                afterEach(()=>
                {
                    jest.clearAllMocks();
                })
            it('Uppercase - calls Callback for invalid arguments', () => 
                {
                    const actual = toUpperCaseWithCb('', callBackMock)
                    expect(actual).toBeUndefined()
                    expect(callBackMock).toHaveBeenCalledWith('Invalid Argument')
                    expect(callBackMock).toHaveBeenCalledTimes(1)
    
                }) 
            it ('Uppercase - calls Callback for valid arguments ', () => 
                {
                    const actual = toUpperCaseWithCb('abc',callBackMock)
                    expect(actual).toBe('ABC')
                    expect(callBackMock).toHaveBeenCalledWith('called function with abc')
                    expect(callBackMock).toHaveBeenCalledTimes(1)
    
                }) 

            })


        //FOR CHECKINH SPY
        describe("Tracking call with spy ", ()=>
            {
                let sut : OtherStringUtils
                beforeEach(()=>
                    {
                        sut = new OtherStringUtils()
                    })



                it("use a spy to track calls", ()=>
                    {
                       const toUpperCaseSpy = jest.spyOn(sut,'upperCase')
                       sut.upperCase('abc')
                       expect(toUpperCaseSpy).toHaveBeenCalledWith('abc')
                    })
                it("uses spy to replace implementation of a method", ()=>
                    {
                        jest.spyOn(sut,'callExternalService').mockImplementation(()=>
                            {
                                console.log('calling mocked implementation!!!')
                            })
                        sut.callExternalService();
                    })
                it('track calls in other modules', ()=>
                    {
                        const consoleLogSpy = jest.spyOn(console,'log')
                        sut.logstring('abc')
                        expect(consoleLogSpy).toHaveBeenLastCalledWith('abc')

                    })

                

            })
    })