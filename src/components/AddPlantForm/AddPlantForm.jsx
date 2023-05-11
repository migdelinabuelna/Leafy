import { useState } from 'react'

import { Button, Form, Segment } from 'semantic-ui-react'



export default function AddPlantForm({handleAddPost}){

    const [caption, setCaption] = useState('')

    const [plantImageFile, setPlantImageFile] = useState('')

    const [swapStatus, setSwapStatus] = useState('')


    function handleFileInput(e) {
        setPlantImageFile(e.target.files[0])
    }

    function handleChange(e) {
        setCaption(e.target.value)
    }

    function handleSwapChange(e) {
        setSwapStatus(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        //make state into form data
        const formData = new FormData(); //because we need to send a multipart/formData request to our express cause of file 
        formData.append('caption', caption);
        formData.append('photo', plantImageFile);
        formData.append('swapstatus', swapStatus)
 //then we make an api call
        handleAddPost(formData); //passed down in params from feed component where we are storing the state

        ///this is resetting our form after we submit it :)
        e.target.reset() //this is a built in event handler

    }



    return (
       <Segment>
        <Form onSubmit={handleSubmit}>
            <Form.Input
                type='file'
                placeholder="upload image"
                onChange={handleFileInput}
            />
            <Form.Input
                placeholder='Your thoughts on this plant'
                required
                name="caption"
                onChange={handleChange}
            />
            <Form.Field name="swapstatus" control='select' onChange={handleSwapChange}>
                <option key='blankKey' hidden value > AVAILABLE FOR SWAPS?</option>
                <option value='YES'>YES</option>
                <option value='NO'>NO</option>
                <option value='MAYBE'>MAYBE</option>

            </Form.Field>
            <Button type="submit">Add Plant To Collection </Button>
        </Form>
       </Segment>
    )
} 