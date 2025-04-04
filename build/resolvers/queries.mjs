export default {
    leagues: async (root, args, { db }, info) => {
        try {
            // const cacheControl = cacheControlFromInfo(info)
            // cacheControl.setCacheHint({ maxAge: 300, scope: 'PUBLIC' });
            return await db.League.findAll({
                include: [
                    {
                        model: db.Team,
                        as: 'teams'
                    }
                ]
            });
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    },
    teams: async (root, args, { db }, info) => {
        try {
            // const where = args.leagueId ? { leagueId: args.leagueId } : {};
            //JH-NOTE: unreadable, and may not work, but...
            // should handle case if given both parameters
            // uses teamsId if its there, (would not use leagueId)
            // then checks for leagueId, and should return teams in league succesfully
            // ignores sleague Id if provided a teamId
            // is this good graphql form?
            const where = args.teamsId ? { id: args.teamsId } : args.leagueId ? { leagueId: args.leagueId } : {};
            return await db.Team.findAll({
                include: [
                    {
                        model: db.League,
                        as: 'league'
                    },
                    {
                        model: db.Roster,
                        as: 'roster',
                    },
                ],
                where
            });
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    },
    players: async (root, args, { db }, info) => {
        try {
            const where = args.playerId ? { id: args.playerId } : args.teamsId ? { teamsId: args.teamsId } : {};
            const players = await db.Player.findAll({ where });
            return {};
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    },
};
