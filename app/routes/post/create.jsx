import { useTransition, useActionData, Form } from "@remix-run/react"
import { json, redirect } from "@remix-run/node"
import { db } from "../../services/db"

const badRequest = data => {
    return json(data, {status: 400})
}

export const action = async({ request }) => {
    const form = await request.formData()

    const title = form.get('title')
    const body = form.get('body')

    const data = {title, body}
    //console.log(data) // This is to check your current data

    // Validation:
    const fieldErrors = {
        title: title.length < 3 ? 'Title must be at least 3 characters' : null,
        body: body.length < 5 ? 'Content must be at least 3 characters' : null
    }

    const hasErrors = Object.values(fieldErrors).some(Boolean)

    if (hasErrors) return badRequest({fieldErrors, data})

    // In case you want to force a waiting
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Save post on the data base
    const post = await db.post.create({ data })
    
    return redirect(`/post/${post.id}`)
}

export function ErrorBoundary({error}) {
    return <>
        <strong>Something is wrong</strong>
        <p style={{color: 'red'}}>{error.message}</p>
    </>
}

export default function CreatePost () {
    const { state } = useTransition()
    const actionData = useActionData()

    const { fieldErrors } = actionData ?? {}

    const { title: titleError, body: bodyError } = fieldErrors ?? {}

    const isSubmiting = (state === 'submitting') || (state === 'loading')

    return <>
        <h4>Create new post</h4>
        <Form method='POST' disabled={isSubmiting}>
            <div>
                <label htmlFor="title">Title</label>
                <input disabled={isSubmiting} placeholder="Post Title" type='text' id="title" name='title'/>
                {titleError && <p><small style={{color: 'red'}}>{titleError}</small></p>}
            </div>
            
            <div>
                <label htmlFor="body">Content</label>
                <textarea disabled={isSubmiting} placeholder="Post Content" type='text' id="body" name='body'/>
                {bodyError && <p><small style={{color: 'red'}}>{bodyError}</small></p>}
            </div>

            <button type="submit" disabled={isSubmiting}>
                {isSubmiting ? 'Please Wait' : 'Add new post'}
            </button>
        </Form>
    </>
}