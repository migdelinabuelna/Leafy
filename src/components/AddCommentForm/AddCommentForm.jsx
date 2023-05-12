import React from "react"
import { Button, Form, Input } from "semantic-ui-react"

export default function AddCommentForm() {
  return (
  <Form >
    <Form.Field >
      <label>COMMENT SECTION</label>
      <Input placeholder='ADD COMMENT' />
      <Button type='submit'>Submit</Button>
    </Form.Field>
  </Form>
)
}

