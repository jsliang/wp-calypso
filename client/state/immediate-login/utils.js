/** @format */

/**
 * External dependencies
 */
import { translate } from 'i18n-calypso';
import { REASON_MANUAL_RENEWAL } from './constants';

/**
 * Processes a redux ROUTE_SET action and returns a URL that contains no parameters that
 * are related to immediate login.
 *
 * @param {string} path  - path
 * @param {object} query - query parameters
 * @return {string}      - the URL without related params
 */
export const createPathWithoutImmediateLoginInformation = ( path, query ) => {
	const relatedParamNames = [ 'logged_via_immediate_link', 'login_reason' ];
	const newQuery = Object.keys( query )
		.filter( k => relatedParamNames.indexOf( k ) === -1 )
		.map( k => `${ encodeURIComponent( k ) }=${ encodeURIComponent( query[ k ] ) }` );
	return path + ( newQuery.length ? '?' + newQuery.join( '&' ) : '' );
};

/**
 * Creates a human-understandable message that communicates that current user was logged in
 *
 * @param {string}  loginReason  - Reason why user were logged in, the message may vary depending on it.
 * @param {string}  email        - Email of currently logged in user
 * @return {string}              - Message to show to user
 */
export const createImmediateLoginMessage = ( loginReason, email ) => {
	switch ( loginReason ) {
		case REASON_MANUAL_RENEWAL:
			return translate(
				'We logged you in as %(email)s so you can go ahead and complete your subscription renewal.',
				{ args: { email } }
			);

		default:
			return translate( 'We logged you in as %(email)s.', { args: { email } } );
	}
};
