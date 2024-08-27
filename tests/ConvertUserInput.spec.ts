import convertUserInputToBoolean from "../routes/jobSearch/utils/convertUserInputToBoolean"

test("it should be possible for user input to be converted to true", ()=>{
    const input = "yes"

    const convert = convertUserInputToBoolean(input)

    expect(convert).toBeTruthy()
})

test("it should not be possible for user input to be converted to true", ()=>{
    const input = "not"

    const convert = convertUserInputToBoolean(input)

    expect(convert).toBeFalsy()
})