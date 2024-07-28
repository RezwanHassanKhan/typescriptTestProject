// we will mock entire modules

jest.mock('../../app/doubles/OtherUtils', ()=>({
    ...jest.requireActual('../../app/doubles/OtherUtils'),
    calculateComplexity : () => {return 10}

}))
import { v4 } from 'uuid'
import * as OtherUtils from '../../app/doubles/OtherUtils' 

jest.mock('uuid', ()=>({
    v4 : ()=> '123'
}))

describe.skip('mock module test', ()=>
    {
        it('calcualte complexity', ()=>
            {
                const result = OtherUtils.calculateComplexity({} as any)
                expect(result).toBe(10)
            })
        
        it('should return uppercase', ()=>
            {
                const result = OtherUtils.toUpperCase('abc')
                expect(result).toBe('ABC')


            })
        
        it('should return lowercase with id', ()=>
            {
                const result = OtherUtils.toLowerCaseId('ABC')
                expect(result).toBe('abc123')


            })
        
    })