import React, {useState, useEffect} from 'react'
import { PostCard } from '../components/index'
import appWriteService from "../appwrite/dbs";

function AllPost() {

   const [posts, setPosts] = useState([]);
    useEffect(() => {
        appWriteService.getPostList([]).then((posts) =>{
            if(posts){
                setPosts(posts.documents);
            };
        })
    },[]);


    return (
        <div className="mx-auto max-w-7xl py-12 md:py-24">
            {
                posts.map((post) => (
                    <div key={post.$id}>
                        <PostCard {...post}/>
                    </div>
                ))
            }
        </div>
    )
}

export default AllPost
