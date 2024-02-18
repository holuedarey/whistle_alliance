import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingResources, LandingResourcesNavMap } from '../../landing-resources';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { OnboardingService } from 'src/app/@core/data-services/onboarding.service';
import { NinDto } from 'src/app/@core/dtos/nin.dto';
import { MessageService } from 'src/app/@core/data-services/message.service';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { TermsAndConditionComponent } from 'src/app/@theme/components/terms-condition-modal/terms-condition-modal.component';

@Component({
  selector: 'app-nin-form',
  templateUrl: './nin-form.component.html',
  styleUrls: ['./nin-form.component.scss']
})
export class NinFormComponent implements OnInit {

  redirectDelay = 0;
  showMessages: any = {};

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  rememberMe = true;

  checked = false;

  constructor(
    protected service: OnboardingService,
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private _route: ActivatedRoute,
    private messageService: MessageService,
    private dialogService: NbDialogService,
    private toastr:NbToastrService
  ) { }

  ngOnInit(): void {
  }


  toggle(checked: boolean) {
    this.checked = checked;
  }

  processNin(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    if(!this.checked){
      this.submitted = false;
      this.toastr.danger('You have to Accept Terms and Condition', 'Terms and Condition Error', {
        position: NbGlobalPhysicalPosition.TOP_RIGHT
      })
      this.errors = [ 'Accept Terms and Condtiton To Continue'];
      return;
    }
    const ninDto: NinDto = {
      id: this.user.nin,
      idType: "NIN"
    };
    this.service.getNin(ninDto).subscribe(
      (result) => {
        this.submitted = false;
        console.log(result)
        if (result.status === "200") {
          this.messages = ['Verify Successfully'];
          setTimeout(() => {
            console.log('set data:', result.content[0].registrationNextStep);

            this.messageService.setMessage(result.content);
            const navigateRoute = result.content[0].registrationNextStep;
            if (navigateRoute == 'CREDENTIAL_UPDATE') {
              return this.router.navigate(
                [LandingResourcesNavMap.get(LandingResources.PersonalInfoView)?.route as string],
                {
                  queryParams: { user: result['content'][0].id, nin: this.user.nin },
                  queryParamsHandling: 'merge'
                }
              );
            } else if (navigateRoute == 'ACCOUNT_ACTIVATION') {
              return this.router.navigate(
                [LandingResourcesNavMap.get(LandingResources.OtpView)?.route as string], 
                {
                  queryParams: { user: result['content'][0].id, nin: this.user.nin },
                  queryParamsHandling: 'merge'
                }
              );
            } else {
              return this.router.navigate(
                [LandingResourcesNavMap.get(LandingResources.PersonalInfoView)?.route as string],
                {
                  queryParams: { user: result['content'][0].id, nin: this.user.nin },
                  queryParamsHandling: 'merge'
                }
              );
            }

          }, this.redirectDelay);
          this.cd.detectChanges();
        } else {
          console.log(result.message)
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

  async termsAndCondition(){
    await this.dialogService.open(TermsAndConditionComponent, {
    }).onClose.toPromise();
    
   }
}
