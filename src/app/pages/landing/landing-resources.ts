import { ResourceNavModel } from "src/app/@core/models/resource-nav.model";

export enum LandingResources {
    NinView = 'landing:nin-view',
    PersonalInfoView = 'landing:personal-info-view',
    OtpView = 'landing:otp-view',
    PresignInView = 'landing:pres-signin-view'
}

export const LandingResourcesNavMap = new Map<LandingResources, ResourceNavModel>([
    [
        LandingResources.NinView,
        {
            route: `/nin`,
            path: 'nin'
        }
    ],
    [
        LandingResources.PersonalInfoView,
        {
            route: `/personal-info`,
            path: 'personal-info'
        }
    ],
    [
        LandingResources.OtpView,
        {
            route: `/otp`,
            path: 'otp'
        }
    ],
    [
        LandingResources.PresignInView,
        {
            route: `/pre-signin`,
            path: 'pre-signin'
        }
    ]
])
