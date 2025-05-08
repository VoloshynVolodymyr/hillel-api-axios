const axios = require('axios').default

describe('Test GET method', () => {
	test('Test GET method for all users', async () => {
		const response = await axios.get('https://jsonplaceholder.typicode.com/users')
		const responseData = response.data
		expect(responseData).toHaveLength(10)
		expect(responseData[0]).toHaveProperty('name')
		expect(response.status).toBe(200)
	})

	test('Test GET for the first user and verify response', async () => {
		const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
		const responseData = response.data
		expect(response.status).toBe(200)
		expect(responseData.userId).toBe(1)
		expect(responseData.id).toBe(1)
		expect(responseData.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
		expect(typeof responseData.title).toBe('string')
	})
})

describe('Test POST method', () => {
	test("Test POST method for the first post and verify response", async () => {
		const postBody = {
			"userId": 999,
			"title": "test user",
			"body": "test body"
		}
		const response = await axios.post('https://jsonplaceholder.typicode.com/posts', postBody)
		const responseData = response.data
		expect(response.status).toBe(201)
		expect(responseData.userId).toEqual(postBody.userId)
		expect(responseData.title).toEqual(postBody.title)
		expect(responseData.body).toEqual(postBody.body)
	})
})

describe('Test PUT method', () => {
	test("Test PUT method for the first post and verify response", async () => {
		const updateData = {
			id: 1,
			title: "updated title with PUT method",
			body: "updated body with PUT method",
			userId: 1
		  }
		const response = await axios.put('https://jsonplaceholder.typicode.com/posts/1', updateData)
		const updatedPost = response.data
		expect(response.status).toBe(200)
		expect(updatedPost.body).toEqual(updateData.body)
		expect(updatedPost.title).toEqual(updateData.title)
		expect(updatedPost.userId).toEqual(updateData.userId)
	})
})

describe('Test PATCH method', () => {
	test("Test PATCH method for the first post and verify response", async () => {
		const updateData = {
			title: "updated title with PATCH method",
		  }
		const response = await axios.put('https://jsonplaceholder.typicode.com/posts/1', updateData)
		const updatedPost = response.data
		expect(response.status).toBe(200)
		expect(updatedPost.title).toEqual(updateData.title)
	})
})