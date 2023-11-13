import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import {TextBox, Button, DropDown, RichTextBox} from "../index";
import appWriteService from "../../appwrite/dbs";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { data } from 'autoprefixer';


export default function PostForm({post}) {

    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues:{
            title:post?.title ||"",
            slug: post?.slug  ||"",
            content : post?.content ||"",
            status : post?.status ||"",
        },
    });

    const navigate = useNavigate();
    const userData =useSelector((state) => state.auth.userData);

    const submit = async(data) => {
        if(post) {
            const file = data.image[0] ? await appWriteService.uploadFile(data.image[0]): null;

            if (file){
                appWriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appWriteService.updatePost(post.$id,{...data, featuredImage : file ? file.$id : undefined,});

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
        <>

        <form onSubmit={handleSubmit(submit)} className="mt-8 space-y-4">
                  <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                    <div className="grid w-full  items-center gap-1.5">
                      {/* <label
                        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="first_name"
                      >
                        First Name
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="text"
                        id="first_name"
                        placeholder="First Name"
                      /> */}
                      <TextBox 
                        label="Title"
                        placeholder="Enter post title"
                        {...register("title",{required:true})}
                      />
                    </div>
                    <div className="grid w-full  items-center gap-1.5">
                      {/* <label
                        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="last_name"
                      >
                        Last Name
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="text"
                        id="last_name"
                        placeholder="Last Name"
                      /> */}
                      <TextBox 
                      label="Slug"
                      {...register("slug", {required:true})}
                      />
                    </div>
                  </div>
                  <div className="grid w-full  items-center gap-1.5">
                    <RichTextBox label="Content" name="content" control={control} defaultValue={getValues("content")}/>
                    </div>
                  <div className="grid w-full  items-center gap-1.5">
                    {/* <label
                      className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="phone_number"
                    >
                      Phone number
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      type="tel"
                      id="phone_number"
                      placeholder="Phone number"
                    /> */}
                    <TextBox 
                    label="Featured Image"
                    type ="file"
                    accept ="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image",{required : !post})}
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
                      options ={["active","inactive"]}
                      label ="Status"
                      {...register("status",{required:true})}
                    />
                    {/* <label
                      className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      id="message"
                      placeholder="Leave us a message"
                      cols={3}
                    /> */}
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    {post ? "Update":"Submit"}
                  </Button>
        </form>
        </>
    )
}


