CREATE TYPE "public"."breeding_status" AS ENUM('requested', 'accepted', 'declined', 'resolved');--> statement-breakpoint
CREATE TYPE "public"."snail_status" AS ENUM('active', 'estivating', 'deceased');--> statement-breakpoint
CREATE TABLE "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "breeding_event" (
	"id" text PRIMARY KEY NOT NULL,
	"requesterSnailId" text NOT NULL,
	"partnerSnailId" text NOT NULL,
	"requesterUserId" text NOT NULL,
	"partnerUserId" text NOT NULL,
	"status" "breeding_status" DEFAULT 'requested' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"resolvesAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "clutch" (
	"id" text PRIMARY KEY NOT NULL,
	"breedingEventId" text NOT NULL,
	"ownerId" text NOT NULL,
	"parentAId" text NOT NULL,
	"parentBId" text NOT NULL,
	"eggCount" integer NOT NULL,
	"laidAt" timestamp DEFAULT now() NOT NULL,
	"hatchesAt" timestamp NOT NULL,
	"hatched" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "diary_event" (
	"id" text PRIMARY KEY NOT NULL,
	"snailId" text NOT NULL,
	"kind" text NOT NULL,
	"message" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "follow" (
	"followerId" text NOT NULL,
	"followingId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "follow_followerId_followingId_pk" PRIMARY KEY("followerId","followingId")
);
--> statement-breakpoint
CREATE TABLE "memorial" (
	"id" text PRIMARY KEY NOT NULL,
	"snailId" text NOT NULL,
	"ownerId" text NOT NULL,
	"name" text NOT NULL,
	"genome" jsonb NOT NULL,
	"bornAt" timestamp NOT NULL,
	"diedAt" timestamp NOT NULL,
	"epitaph" text
);
--> statement-breakpoint
CREATE TABLE "report" (
	"id" text PRIMARY KEY NOT NULL,
	"reporterId" text NOT NULL,
	"subjectType" text NOT NULL,
	"subjectId" text NOT NULL,
	"reason" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"resolved" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "snail" (
	"id" text PRIMARY KEY NOT NULL,
	"ownerId" text NOT NULL,
	"name" text NOT NULL,
	"genome" jsonb NOT NULL,
	"bornAt" timestamp DEFAULT now() NOT NULL,
	"lastTick" timestamp DEFAULT now() NOT NULL,
	"health" real DEFAULT 1 NOT NULL,
	"hunger" real DEFAULT 0 NOT NULL,
	"mood" real DEFAULT 0.7 NOT NULL,
	"positionX" real DEFAULT 0.5 NOT NULL,
	"positionY" real DEFAULT 0.5 NOT NULL,
	"status" "snail_status" DEFAULT 'active' NOT NULL,
	"parentAId" text,
	"parentBId" text,
	"generation" integer DEFAULT 1 NOT NULL,
	"trailLength" real DEFAULT 0 NOT NULL,
	"deceasedAt" timestamp,
	"isPublic" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "terrarium" (
	"id" text PRIMARY KEY NOT NULL,
	"ownerId" text NOT NULL,
	"humidity" real DEFAULT 0.6 NOT NULL,
	"temperature" real DEFAULT 0.5 NOT NULL,
	"substrate" text DEFAULT 'loam' NOT NULL,
	"cosmetics" jsonb DEFAULT '[]'::jsonb NOT NULL,
	CONSTRAINT "terrarium_ownerId_unique" UNIQUE("ownerId")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	"displayName" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clutch" ADD CONSTRAINT "clutch_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diary_event" ADD CONSTRAINT "diary_event_snailId_snail_id_fk" FOREIGN KEY ("snailId") REFERENCES "public"."snail"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follow" ADD CONSTRAINT "follow_followerId_user_id_fk" FOREIGN KEY ("followerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follow" ADD CONSTRAINT "follow_followingId_user_id_fk" FOREIGN KEY ("followingId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "memorial" ADD CONSTRAINT "memorial_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "snail" ADD CONSTRAINT "snail_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "terrarium" ADD CONSTRAINT "terrarium_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "breeding_partner_idx" ON "breeding_event" USING btree ("partnerUserId");--> statement-breakpoint
CREATE INDEX "diary_snail_idx" ON "diary_event" USING btree ("snailId");--> statement-breakpoint
CREATE INDEX "snail_owner_idx" ON "snail" USING btree ("ownerId");--> statement-breakpoint
CREATE INDEX "snail_status_idx" ON "snail" USING btree ("status");