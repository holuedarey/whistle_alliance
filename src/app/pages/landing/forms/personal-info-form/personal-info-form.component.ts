import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalInfoDto } from 'src/app/@core/dtos/personal-info.dto';
import { LandingResources, LandingResourcesNavMap } from '../../landing-resources';
import { OnboardingService } from 'src/app/@core/data-services/onboarding.service';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { UserService } from 'src/app/@core/data-services/user.service';
import { MessageService } from 'src/app/@core/data-services/message.service';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss']
})
export class PersonalInfoFormComponent implements OnInit {

  redirectDelay = 0;
  showMessages: any = {};

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  rememberMe = true;
  userId: any;
  nin: any;
  isPasswordHidden = true;
  isPasswordHiddenConf = true;


  userData: any = {};
  constructor(
    protected service: OnboardingService,
    protected cd: ChangeDetectorRef,
    protected router: Router,
    protected userService: UserService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.messageService.getMessage.subscribe((data: any) => {
      this.userData = (data);
      this.setUSerData();

    });
  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.queryParams.user;
    this.nin = this.activatedRoute.snapshot.queryParams.nin;

    // this.getSingleUser(); 
  }

  async getSingleUser() {
    this.userService.getSingleUser(this.userId).subscribe(
      (result) => {
        this.userData = result.content[0];
      })
  }
  setUSerData() {
    if (typeof this.userData !== 'undefined' && this.userData) {
      this.userData = this.userData[0]
      this.user.firstname = this.userData.firstName;
      this.user.lastname = this.userData.lastName;
      this.user.dob = this.userData.dateOfBirth;
      this.user.phonenumber = this.userData.phoneNumber;
      this.user.nin = this.userData.idNumber || this.nin;
      this.user.password = "";
      this.user.confirmpassword = "";
      return;
    } else {
      return this.router.navigate(
        [LandingResourcesNavMap.get(LandingResources.NinView)?.route as string]
      );
    }


  }

  processInfo(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const personalInfoDto: PersonalInfoDto = {
      email: this.user.email,
      password: this.user.password,
      confirmPassword: this.user.password,
      updateType: "REGISTRATION"
    };
    this.service.processInfo(personalInfoDto, this.userId).subscribe(
      (result) => {
        this.submitted = false;

        if (result.status == "200") {
          setTimeout(() => {
            return this.router.navigate(
              [LandingResourcesNavMap.get(LandingResources.OtpView)?.route as string],
              {
                queryParams: { user: result['content'][0].id },
                queryParamsHandling: 'merge'
              }
            );
            // return this.router.navigateByUrl(LandingResourcesNavMap.get(LandingResources.OtpView)?.route as string);
          }, this.redirectDelay);
          this.cd.detectChanges();
        } else {
          this.errors = [
            result.message as string
          ];
        }
      },
      (error: ResponseDto<string>) => {
        this.submitted = false;
        this.errors = [
          'An Error occured while logging you in.',
        ];
      }
    );
  }
}
