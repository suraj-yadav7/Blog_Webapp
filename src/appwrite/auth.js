import { Client,Account,ID } from "appwrite";
import conf from "../conf/conf"
//create auth service class
export class AuthServices {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }
    // creating user account with this method
    async createAccount({email,password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name,)
            if(userAccount){
                // call user login method
                return this.userLogin(email,password)
            }
            else{
                return userAccount
            }
        } catch (error) {
            throw error
        }

    }

    // login method
    async userLogin({email,password}){
        try {
            return this.account.createEmailSession(email,password)
        } catch (error) {
            throw error
        }
    }

    //knowing user is still login in homepage
    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log("Apwrite service :: getCurrentUser :: error", error)
        }
        return null
    }

    //loging out user method
    async userLogout(){
        try{
            return await this.account.deleteSessions()
        }
        catch(error){
            console.log("Apwrite service :: userLogout :: error", error)
        }
    }
}

//create new object using class and with dot notation all methods can be accessed eg: authServices.login()
const authServices = new AuthServices()

export default authServices;