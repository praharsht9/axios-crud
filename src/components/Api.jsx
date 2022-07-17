import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'bootstrap';
// import { Button } from 'react-bootstrap/Button';

const Api = () => {
	const [posts, setPost] = useState([]);

	const apiEndPoint = 'https://jsonplaceholder.typicode.com/posts';

	const addPost = async () => {
		const post = { title: 'New Post', body: 'new' };
		await axios.post(apiEndPoint, post);
		setPost([post, ...posts]);
	};

	const handleUpdate = async (post) => {
		post.title = 'Updated';
		await axios.put(apiEndPoint + '/' + post.id);
		const postsClone = [...posts];
		const index = postsClone.indexOf(post);
		postsClone[index] = { ...post };
		setPost(postsClone);
	};

	const handleDelete = async (post) => {
		await axios.delete(apiEndPoint + '/' + post.id + post);
		setPost(posts.filter((p) => p.id !== post.id));
	};

	useEffect(() => {
		const getPost = async () => {
			const { data: res } = await axios.get(apiEndPoint);
			setPost(res);
		};
		getPost();
	}, []);

	return (
		<div>
			<h2> There are {posts.length} post in the database</h2>
			<button onClick={addPost} className='btn btn-primary btn-sm'>
				Add Post
			</button>
			<table className='table'>
				<thead>
					<tr>
						<th>Title</th>
						<th>Update</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{posts.map((post) => (
						<tr key={post.id}>
							<td>{post.title}</td>
							<td>
								<button
									className='btn btn-info btn-sm'
									onClick={() => {
										handleUpdate(post);
									}}
								>
									Update
								</button>
							</td>
							<td>
								<button
									className='btn btn-danger btn-sm'
									onClick={() => {
										handleDelete(post);
									}}
									// onClick={() => handleDelete(post)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Api;
