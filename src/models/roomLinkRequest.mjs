import uuid from 'uuid';

/* Enumeration of the allowable statuses for a room link request to be in. */
export const RoomLinkRequestResolution = {
  APPROVED: 'approved',
  REJECTED: 'rejected',
  UNRESOLVED: 'unresolved',
};

/*
 * A room link request is a request submitted by a new user to create their own private room.
 * The request must be approved by an administrator before the user is allowed to create a room.
 */
export class RoomLinkRequest {
  constructor(name, email) {
    this.requestID = uuid.v4();
    this.name = name;
    this.email = email;
    this.resolution = RoomLinkRequestResolution.UNRESOLVED;
    this.roomID = null;
    this.roomCode = null;
    this.createdTime = new Date();
    this.resolvedTime = null;
  }
}
