import { toUpperCase , getStringInfo, StringUtils } from "../app/Utils";


describe.skip("Utils Test Suite",()=>
{
    describe('StringUtils Test', ()=> 
    {
        
        let sut : StringUtils;
        
        beforeEach(()=>
            {
                console.log('Setup');
                sut = new StringUtils(); //every test we are inityializing new class
           })

        afterEach(()=>
        {
            //afterEach is used for teardown step
            console.log('Teardown');
        }
         )
        
        it('should return lowercases', ()=>
        {   
            console.log('Actual Test')
            //arrange
            const expected_value = 'abc'
            //action
            const actual = sut.toLowerCase('abc')
            //assert
            expect(actual).toBe(expected_value)
        }
        )

        it('should throw error on invalid argument-function', ()=>
            {   

                function expectError()
                {
                    const actual = sut.toLowerCase('')
                }
                
                //assert
                expect(expectError).toThrow();
                //expect(expectError).toThrowErrorMatchingInlineSnapshot('Invalid Argument');
            }
            )

        it('should throw error on invalid argument-arrow function', ()=>
            {   

                expect(()=>
                    {
                        sut.toLowerCase('')
                    }).toThrow()
              
            }
            )
        it.only('should throw error on invalid argument-try catch block', (done)=>
            {
                try
                {
                   sut.toLowerCase('')
                   done('Get String info should throw an error for invalid string')
                }
                catch(error)
                {
                    expect(error).toBeInstanceOf(Error)
                    done()

                }   
                
            }
            )
    }
    )


    describe("Multiple Uppercases input", ()=>
        {
            it.each(
                [
                    {input:'abc', expected:'ABC' },
                    {input:'hello', expected:'HELLO' },
                    {input:'ddd', expected: 'DDD'},
                    {input:'gggg', expected: 'GGGG'}
                ]
            )
            ('$input toUpperCase should be $expected', ({input,expected})=>
            { 
                //arrage
                const sut = toUpperCase
                //action
                const actual = sut(input)
                //assert
                expect(actual).toBe(expected)

            }
            )
            


    }
    )


    // describe('String Test', () =>
    //     {
    //         it('should return a uppercase of valid string', () =>
    //             {
    //                 //arrange
    //                 const sut = toUpperCase
    //                 const expected = 'ABC'
        
    //                 //action
    //                 const actual = sut('abc')
        
    //                 //assert
    //                 expect(actual).toBe(expected)
    //             }    
    //         )
    //     }
    //     )
        
    
    describe('getStringInfo for arg My-String should',() => 
    { 
        it('should return right length', () =>
            {
                //arrage
                const sut = getStringInfo('My-String');
                const expected_length= 9;
                //action
                const actual = sut.characters;
                //assert
                expect(actual).toHaveLength(expected_length);
            }
        )

        it('should return right lowercase', ()=>
        {
            //arrange
            const sut = getStringInfo('My-String') 
            //action
            const actual = sut.lowerCase
            //assert
            expect(actual).toBe('my-string')

        }
    )
        it('should return righ uppercase',()=>
        {
          //arrange
          const sut = getStringInfo('My-String')
          //action
          const actual = sut.upperCase
          //assert
          expect(actual).toBe('MY-STRING')
        }
    )

        it('retun right characters', () =>
            {
                //arrange
                const sut = getStringInfo('My-String')
                const expected_char =['M', 'y', '-','S', 't', 'r','i', 'n', 'g']

                //action
                const actual = sut.characters
                //assert
                expect(actual).toEqual(expected_char)
                expect(actual)

        }

        )

    
    }
    )

}
)






