import { Client, Databases, Storage ,ID,Query} from "appwrite";
import conf from "../conf/conf.js"

export class Service {
    client = new Client();
    databases;
    bucket
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    // creating a post
    async createPost({title,slug,featuredImage,content, status, userId}){
        try{
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId,slug,{title,content,featuredImage,status,userId})
        }
        catch(error){
            console.log("Apwrite service :: createPost :: error", error)
        }
    }

    // updating exisiting post of a user.
    async updatePost(slug,{title,content,status,featuredImage}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId,slug,{title, content, status,featuredImage})
        } catch (error) {
            console.log("Apwrite service :: updatePost :: error", error)
        }
    }

    //Deleting post
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId,slug)
            return true
        } catch (error) {
            console.log("Apwrite service :: deletePost :: error", error)
            return false
        }
    }

    // Getting the individual post
    async getPost(slug){
        try {
             const postData=await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
            return postData
        } catch (error) {
            console.log("Apwrite service :: get single post :: error", error)
        }
    }

    // Gwtting all post can be done only when index are defined in backend database
    async getAllpost(queries=[Query.equal("status","active")]){
        try {
             const allPostList= await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId,queries)
            return allPostList
        } catch (error) {
            console.log("Apwrite service :: get all post :: error", error)
            return false;
        }
    }

    // uploading image file in buket of database.
    async uploadFile(file){
        try{
            return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(), file)
        }
        catch(error){
            console.log("Apwrite service :: upload file :: error", error)
            return false
        }
    }

    // Deleting a image file from buket of database
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId,fileId)
            return true
        } catch (error) {
            console.log("Apwrite service :: deleteFile :: error", error)
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
    }
}

const service = new Service();
export default service;