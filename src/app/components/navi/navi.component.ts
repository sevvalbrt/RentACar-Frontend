import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  filterText:string
  currentUserId:number;
  user:User;

  constructor(private localStorageService: LocalStorageService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();
    this.getUserDetail();
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
  logOut(){
    this.localStorageService.clean();
    this.router.navigate([""])
  }
  getUserDetail(){
    this.userService.getByUserId(this.currentUserId).subscribe(response => {
      this.user = response.data;
      console.log(this.user.firstName)
    });
  }

}
