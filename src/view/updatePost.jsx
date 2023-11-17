import React, {useState, useEffect} from 'react'
import {PostForm} from "../components/index";
import appWriteService from "../appwrite/dbs";
import { useNavigate, useParams } from 'react-router-dom';


function UpdatePost() {

    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() =>{
        if(slug){
            appWriteService.getPost(slug).then((post) =>{
                if(post){
                    setPost(post);
                }
            })
        }else {
            navigate("/");
        }
    },[slug, navigate]);


    return post ? (
        <div className="mx-auto max-w-7xl py-12 md:py-24">
            <PostForm post={post} />
        </div>
    ) : null
}

export default UpdatePost
