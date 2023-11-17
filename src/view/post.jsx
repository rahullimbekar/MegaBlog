import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import appWriteService from "../appwrite/dbs"
import {Button} from "../components/index";
import parse from "html-react-parser";
import { useSelector } from 'react-redux';


function Post() {

    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() =>{
        if(slug){
            appWriteService.getPost(slug).then((post) =>{
                if(post) setPost(post);
                else navigate("/");
            })
        } else navigate("/");
    },[slug, navigate]);

    const deletePost = ()=>{
        appWriteService.deletePost(post.$id).then((status) => {
            if(status){
                appWriteService.deletePost(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="my-18 -mx-4 flex flex-wrap px-4">
              <div className="mb-12 w-full px-4 lg:mb-0 lg:w-1/2">
                <a className="group block w-full" href="#">
                  <img
                    src={appWriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                  />
                  <span className="mb-5 block text-gray-500">Jul 20, 2023</span>
                  <h4 className="mb-5 text-3xl font-semibold text-gray-900">
                    {post.title}
                  </h4>
                </a>
                <div>
                {parse(post.content)}
                </div>
              </div>
              {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/update-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
              </div>
              
    ):null;
}

export default Post
