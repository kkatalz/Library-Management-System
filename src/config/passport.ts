import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import CONFIG from '../config';
import prisma from '../lib/prisma';

// Find or create a user by Google email
passport.use(
  new GoogleStrategy(
    {
      clientID: CONFIG.googleClientId,
      clientSecret: CONFIG.googleClientSecret,
      callbackURL: CONFIG.googleCallbackUrl,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error('Google account has no email'));
        }

        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName,
              email,
              passwordHash: '',
            },
          });
        }

        done(null, user);
      } catch (err) {
        done(err as Error);
      }
    },
  ),
);

export default passport;
