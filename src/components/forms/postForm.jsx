import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import {TextBox, Button, DropDown, RichTextBox} from "../index";
import appWriteService from "../../appwrite/dbs";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function PostForm({ post }) {
  
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues:{
            title:post?.title ||"",
            slug: post?.$id  ||"",
            content : post?.content ||"",
            status : post?.status ||"active",
        },
    });
    
    const navigate = useNavigate();
    const userData =useSelector((state) => state.auth.userData);

    const submit = async(data) => {
        if(post) {
          console.log(data.content);
            const file = data.image[0] ? await appWriteService.uploadFile(data.image[0]): null;
            if (file){
                appWriteService.deleteFile(post.featuredImage);
            }
            
            const dbPost = await appWriteService.updatePost(post.$id, {
              ...data, 
              featuredImage : file ? file.$id : undefined,
            });
            
            if(dbPost){
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
              const file = await appWriteService.uploadFile(data.image[0]);
              if (file){
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appWriteService.createPost({...data, userId: userData.$id});
                if(dbPost){
                  navigate(`/post/${dbPost.$id}`);
                }
              }
        }
    };

    const slugTransform = useCallback((value) => {
      if(value && typeof value === "string")
        return value
        .trim()
        .toLocaleLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g,"-")
        .replace(/\s/g,"-");
      
        return "";
    },[]);

    React.useEffect(()=> {
      const subscription = watch((value, {name}) =>{
        if(name === "title"){
          setValue("slug", slugTransform(value.title), {shouldValidate : true});
        }
      });
      return () => subscription.unsubscribe();
    },[watch, slugTransform, setValue]);
     

    return (
    <form onSubmit={handleSubmit(submit)} className="mt-8 space-y-4">
      <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
        <div className="grid w-full  items-center gap-1.5">
          <TextBox
            label="Title"
            placeholder="Enter post title"
            {...register("title", { required: true })}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <TextBox
            label="Slug"
            {...register("slug", { required: true })}
            disabled
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
          />
        </div>
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <RichTextBox label="Content" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <TextBox
          label="Featured Image"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
      </div>
      {
        post && (
          <div className="grid w-full  items-center gap-1.5">
            <img src={appWriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
            />
          </div>
        )
      }
      <div className="grid w-full  items-center gap-1.5">
        <DropDown
          options={["active", "inactive"]}
          label="Status"
          {...register("status", { required: true })}
        />
      </div>
      <Button
        type="submit"
        className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        {post ? "Update" : "Submit"}
      </Button>
    </form>
  );
}


