import React from "react"
import { Button, Form, Input } from "semantic-ui-react"
import { useState } from "react";

export default function AddCommentForm({handleAddComment, post}) {

  const [comment, setComment] = useState('');

  function handleChange(c) {
    setComment(c.target.value)
  }
  
  function handleSubmit(c) {
    c.preventDefault();
    handleAddComment(post._id, {'comment': comment});
    c.target.reset();
  }

  return (
  <Form onSubmit={handleSubmit}>
    <Form.Field >
      {/* <label>COMMENT SECTION</label> */}
      <Input placeholder='ADD COMMENT' onChange={handleChange}/>
      <Button type='submit'>Submit</Button>
    </Form.Field>
  </Form>
)
}

