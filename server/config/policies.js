'use strict';

/**
* @desc Attribute based access control constructor
* @name ABAC
* @param Object settings
* @return ABAC object
*/
class ABAC {
  constructor(settings) {
    this.settings.ACCESS_CONTROL_POLICIES = ACCESS_CONTROL_POLICIES | {};
    this.settings.ACTIONS = ACTIONS | ['view', 'create', 'update', 'delete'];
    this.settings.ROLES = ROLES | ['admin', 'publisher', 'user', 'guest'];
  }

  /**
  * @desc Authorization middleware
  * @name ABAC.authorize()
  * @param String role name of role
  * @return ABAC object
  */
  authorize(req, res, next) {
    
  }

  /**
  * @desc Adds role to roles list
  * @name ABAC.createRole
  * @param String role name of role
  * @return ABAC object
  */
  createRole(role) {
    if (this.ROLES.includes(role)) {
      throw new Error('Role already exists');
    }
    this.ROLES.push(role);
    return this;
  }

  /**
  * @desc Gets list of roles
  * @name ABAC.getRoles
  * @return Array
  */
  getRoles() {
    return this.ROLES;
  }

  /**
  * @desc Attribute based access control constructor
  * @name ABAC
  * @param object settings
  * @return ABAC object
  */
  createRule() {

  }


}



const ABAC = {

  ACCESS_CONTROL_POLICIES: {
    badges: [
      'user in community may view badge',
      'user in community may search badges',
      'user in community may earn badge in location'
      'captain in community may share badge',
      'captain in community may update badge name',
      'captain in community may update badge description',
      'captain in community may update badge image',
      'admin in community may update badge *',
      'admin in community may delete badge',
      'admin in community may create badge',
      'master in * may * badge'
    ],
    challenges: [

    ],
    communities: [

    ],
    pins: [

    ],
    users: [

    ]
  },
  ACTIONS: [
    'create',
    'update',
    'view',
    'delete',
    'add',
    'remove',
    'search',
    'share',
    'earn'
  ],
  ROLES: [
    'master',
    'admin',
    'captain',
    'user'
  ],
};
