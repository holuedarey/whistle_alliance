import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingResources, LandingResourcesNavMap } from '../../landing-resources';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { OnboardingService } from 'src/app/@core/data-services/onboarding.service';
import { NinDto } from 'src/app/@core/dtos/nin.dto';

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

    const ninDto: NinDto = { 
      id: this.user.nin,
      idType: "NIN"
    };
    this.service.getNin(ninDto).subscribe(
      (result) => {
        this.submitted = false;
        console.log(result)
        if (result.status === "200") {
          this.messages = ['Login successful'];
          setTimeout(() => {
            return this.router.navigate(
              [LandingResourcesNavMap.get(LandingResources.PersonalInfoView)?.route as string], 
              {
                queryParams: { user: result['content'][0].id, nin: this.user.nin },
                queryParamsHandling: 'merge'
              }
            );
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
