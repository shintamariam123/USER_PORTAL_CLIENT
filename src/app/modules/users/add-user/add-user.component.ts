import { Component, OnInit } from '@angular/core';
import { userModel } from '../users.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
user:userModel = {}
allusers:any = []

constructor(private api:ApiService,private router:Router){}
ngOnInit(): void {
  this.api.getAllUserAPI().subscribe((result:any)=>{
    // console.log(result);
    this.allusers=result
  })
}
addUser(){
  // console.log(this.allusers);
  const existingUser = this.allusers.find((item:any)=>item.id==this.user.id)
if (existingUser){
  alert("id already exist!!! Use unique id to add user")
}else{
 this.api.saveUserApi(this.user).subscribe({
    next:(result:any)=>{
      console.log(result);
      alert(`${result.name} has  successfully added to our DB`)

    this.router.navigateByUrl('/users')
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}
  
  
 
}
cancel(){
this.user = {}

}
}
