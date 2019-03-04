export abstract class ChallengeRequest {
    asParams(): { [key: string]: string }  {
        const keys = Object.keys(this);
        var params = {};
        keys.forEach(key => params[key] = String(this[key]));
        return params;
    }
}