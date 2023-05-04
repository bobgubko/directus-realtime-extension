import ms from 'ms';

const CHANNEL_TABLE_NAME = "realtime_channels";


export function runChannelAuthorizer(authorizer, socket_id, channelName, params, auth) {
    try {
        return (new Function('socket_id', 'channel_name', 'params', 'auth', authorizer))(socket_id, channelName, params, auth);
    } catch (_cae) {
        return false;
    }
}

export async function getChannels(database, env, log) {
    try {
        const channels = await database.from(CHANNEL_TABLE_NAME).where({
            enabled: true,
        }).select("*");
        return channels;
    } catch (databaseError) {
        log.error(`Database Error on loadingChannels ; ${databaseError}`);
        return [];
    }
}