import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from "../index"
import appWriteService from "../../appwrite/dbs";

function PostCard({$id, title, featuredImage}) {
    return (
        <div className="w-[300px] rounded-md border">
        <img
          src={appWriteService.getFilePreview(featuredImage)} alt={title}
          className="h-[200px] w-full rounded-t-md object-cover"
        />
        <div className="p-4">
          <h1 className="inline-flex items-center text-lg font-semibold">
            {title}
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            {/* {title} */}
          </p>
          <Link to={`/post/${id}`}>
                    <Button 
                        type="button"
                        className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Read More..
                    </Button>
          </Link>
        </div>
      </div>
    )
}

export default PostCard
