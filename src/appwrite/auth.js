import config from '../config/config';
import { Client,Account,ID } from 'appwrite';

export class AuthService {

client=new Client();
account;

constructor (){
    this.client
        .setEndpoint(config.appWriteUrl)
        .setProject(config.appWriteProjectId);
    this.account=new Account(this.client);
}

async createAccount ({email, password, name}){
    try {
        const userAccount = await this.client.createAccount(ID.unique, email, password, name);
        if (userAccount) {
            return this.signIn({email, password});
        } else {
            return userAccount;
        }
    } catch (error) {
        throw error;
        console.log("Appwrite serive :: createAccount :: error", error);
    }
}

async signUp({email,password,name}){
    try {
        const userAccount = await this.account.create(ID.unique(),email,password,name);
        if (userAccount){
            return this.signIn({email,password});
        } else {
            return userAccount;
        }

    } catch (error) {
        console.log("Appwrite serive :: signUp :: error", error);
    }
}

async signIn({email,password}){
    try {
        return await this.account.createEmailSession(email,password);
    } catch (error) {
        console.log("Appwrite serive :: signIn :: error", error);
    }
}

async getCurrentUser() {
    try {
        return await this.account.get();
    } catch (error) {
        console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
    return null;
}

async signOut(){
    try {
        await this.account.deleteSessions();
    } catch (error) {
        console.log("Appwrite serive :: signOut :: error", error);
    }
}

}

const authService=new AuthService();

export default authService