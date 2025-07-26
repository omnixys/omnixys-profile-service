import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  content: string;

  @Field(() => [String], { nullable: true })
  media?: string[];

  @Field(() => String, { nullable: true })
  isArchived?: boolean; // Optional, can be set later
  @Field({ nullable: true })
  profileId?: string; // Optional, can be set later
  @Field({ nullable: true })
  visibility?: 'public' | 'private' | 'followers'; // Optional, default can be set in the service
  //   @Field({ nullable: true })
  //   tags?: string[]; // Optional, can be set later
  //   @Field({ nullable: true })
  //   location?: string; // Optional, can be set later
  //   @Field({ nullable: true })
  //   scheduledAt?: Date; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isDraft?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isPinned?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isCommentable?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isShareable?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isLikeable?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isEditable?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isReportable?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isBookmarkable?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isNotificationEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isAnalyticsEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isTranslationEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isAccessibilityEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isSEOEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isContentModerationEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isContentRecommendationEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isContentDiscoveryEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isContentCurationEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isContentPersonalizationEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isContentLocalizationEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isContentInternationalizationEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isContentAccessibilityEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isContentSecurityEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isContentPrivacyEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isContentComplianceEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isContentEthicsEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isContentSustainabilityEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isContentInclusivityEnabled?: boolean; // Optional, can be set later
  //   @Field({ nullable: true })
  //   isContentDiversityEnabled?: boolean; // Optional, can be set later
}
