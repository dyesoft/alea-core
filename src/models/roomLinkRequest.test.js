import { describe, expect, test } from '@jest/globals';
import { RoomLinkRequest, RoomLinkRequestResolution } from './roomLinkRequest.mjs';

describe('RoomLinkRequest', () => {
    test('constructor', () => {
        const name = 'Test';
        const email = 'test@example.com';
        const request = new RoomLinkRequest(name, email);
        expect(request.requestID).toBeDefined();
        expect(request.name).toEqual(name);
        expect(request.email).toEqual(email);
        expect(request.resolution).toEqual(RoomLinkRequestResolution.UNRESOLVED);
        expect(request.roomID).toBeNull();
        expect(request.roomCode).toBeNull();
        expect(request.createdTime).toBeDateWithinTolerance();
        expect(request.resolvedTime).toBeNull();
    });
});
