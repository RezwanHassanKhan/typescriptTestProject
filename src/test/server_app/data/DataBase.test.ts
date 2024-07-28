import { DataBase } from "../../../app/server_app/data/DataBase"
import * as IdGenerator from '../../../app/server_app/data/IdGenerator'



type someTypeWithId = 
{
    id : string 
    name : string,
    color : string
}

describe('DataBase Test Suite', ()=>
    {

        //arange
        let sut :DataBase<someTypeWithId>
        const fakeGeneratedId = '123'
        const firstObject = 
            {
                id: '',
                name: 'Mamia Kutta',
                color: 'blue'
            }

        const secondObject = 
        {
            id: '',
            name: 'Mamia Shoitan',
            color: 'blue'
        }
    
        beforeEach(()=>
            {
                sut = new DataBase<someTypeWithId>();
                 //action
                 jest.spyOn(IdGenerator,'generateRandomId').mockReturnValue(fakeGeneratedId)
            })

        it('should return id after inset', async ()=>
            {
               //action
               const actual_id = await sut.insert(
                {
                    id : ''
                }as any)
                  
                //assert
                expect(actual_id).toBe(fakeGeneratedId)

            })
        it('should get element after insert', async ()=>
            { 
                //action
                const id = await sut.insert(firstObject)
                const actual = await sut.getBy('id', id )
                console.log(actual)
                //assert
                expect(actual).toBe(firstObject);


            })
        
        it('should find element after insert', async ()=>
            {
                //action 
                await sut.insert(firstObject),
                await sut.insert(secondObject)
                const actual_array = await sut.findAllBy('color', 'blue') 
                const expected_array = [firstObject,secondObject]
                //assert
                expect(actual_array).toEqual(expected_array)


            })
        it('should change the color of the object', async ()=>
            {
                //action 
                const id = await sut.insert(firstObject)
                const expected_color = 'red'
                await sut.update(id,'color', expected_color)
                
                const updated_object = await sut.getBy('id', id)
                const actual_color = updated_object!.color
                //assert
                expect(actual_color).toBe(expected_color)


            })
        it('should delelte the object',async ()=>
            {
                const id = await sut.insert(firstObject)
                await sut.delete(id)

                const actual = await sut.getBy('id', id)

                expect(actual).toBeUndefined()


            })
        it('it should get all the objects/elements', async ()=>
            {
                //action
                await sut.insert(firstObject)
                await sut.insert(secondObject)
                
                const actual_array = await sut.getAllElements()
                const expected_array = [firstObject,secondObject]
                //assert
                expect(actual_array).toEqual(expected_array)
            })
    })


