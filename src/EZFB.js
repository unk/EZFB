/*!
 * EZFB v0.0.3
 * http://grotesq.com
 *
 * Author : Kim Naram ( a.k.a. Unknown )
 * Email : unknown@grotesq.com
 *
 * Copyright 2007-2013 The GrotesQ
 * Released under the MIT license
 *
 * Date: 2013-08-27 18:14
 */
;( function() {
	if( !window.EZFB ) {
		/* ====================================================================================================

		 Private Variables

		 ==================================================================================================== */

		var _isInit = false;
		var _lang = "en_US";
		var _appId;
		var _opts;
		var _loginStatus = "not_ready";
		var _userId;
		var _accessToken;

		var _eventList = [];

		/* ====================================================================================================

		 Private Functions ( and Handlers )

		 ==================================================================================================== */

		function checkLanguage() {
			var lang = navigator.language || navigator.browserLanguage;
			lang = lang.toLowerCase();

			switch( lang ) {
				case "af" :
				case "af_za" :
					_lang = "af_ZA";
					break;
				case "ar" :
				case "ar_ar" :
					_lang = "ar_AR";
					break;
				case "az" :
				case "az_az" :
					_lang = "az_AZ";
					break;
				case "be" :
				case "be_by" :
					_lang = "be_BY";
					break;
				case "bg" :
				case "bg_bg" :
					_lang = "bg_BG";
					break;
				case "bn" :
				case "bn_in" :
					_lang = "bn_IN";
					break;
				case "bs" :
				case "bs_ba" :
					_lang = "bs_BA";
					break;
				case "ca" :
				case "ca_es" :
					_lang = "ca_ES";
					break;
				case "cs" :
				case "cs_cz" :
					_lang = "cs_CZ";
					break;
				case "cy" :
				case "cy_gb" :
					_lang = "cy_GB";
					break;
				case "da" :
				case "da_dk" :
					_lang = "da_DK";
					break;
				case "de" :
				case "de_de" :
					_lang = "de_DE";
					break;
				case "el" :
				case "el_gr" :
					_lang = "el_GR";
					break;
				case "en_gb" :
					_lang = "en_GB";
					break;
				case "en_pi" :
					_lang = "en_PI";
					break;
				case "en_ud" :
					_lang = "en_UD";
					break;
				case "eo" :
				case "eo_eo" :
					_lang = "eo_EO";
					break;
				case "es" :
				case "es_es" :
					_lang = "es_ES";
					break;
				case "es_la" :
					_lang = "es_LA";
					break;
				case "et" :
				case "et_ee" :
					_lang = "et_EE";
					break;
				case "eu" :
				case "eu_es" :
					_lang = "eu_ES";
					break;
				case "fa" :
				case "fa_ir" :
					_lang = "fa_IR";
					break;
				case "fb" :
				case "fb_lt" :
					_lang = "fb_LT";
					break;
				case "fi" :
				case "fi_fi" :
					_lang = "fi_FI";
					break;
				case "fo" :
				case "fo_fo" :
					_lang = "fo_FO";
					break;
				case "fr_ca" :
					_lang = "fr_CA";
					break;
				case "fr" :
				case "fr_fr" :
					_lang = "fr_FR";
					break;
				case "fy" :
				case "fy_nl" :
					_lang = "fy_NL";
					break;
				case "ga" :
				case "ga_ie" :
					_lang = "ga_IE";
					break;
				case "gl" :
				case "gl_es" :
					_lang = "gl_ES";
					break;
				case "he" :
				case "he_il" :
					_lang = "he_IL";
					break;
				case "hi" :
				case "hi_in" :
					_lang = "hi_IN";
					break;
				case "hr" :
				case "hr_hr" :
					_lang = "hr_HR";
					break;
				case "hu" :
				case "hu_hu" :
					_lang = "hu_HU";
					break;
				case "hy" :
				case "hy_am" :
					_lang = "hy_AM";
					break;
				case "id" :
				case "id_id" :
					_lang = "id_ID";
					break;
				case "is" :
				case "is_is" :
					_lang = "is_IS";
					break;
				case "it" :
				case "it_it" :
					_lang = "it_IT";
					break;
				case "ja" :
				case "ja_jp" :
					_lang = "ja_JP";
					break;
				case "ka" :
				case "ka_ge" :
					_lang = "ka_GE";
					break;
				case "km" :
				case "km_kh" :
					_lang = "km_KH";
					break;
				case "ko" :
				case "ko_kr" :
					_lang = "ko_KR";
					break;
				case "ku" :
				case "ku_tr" :
					_lang = "ku_TR";
					break;
				case "la" :
				case "la_va" :
					_lang = "la_VA";
					break;
				case "lt" :
				case "lt_lt" :
					_lang = "lt_LT";
					break;
				case "lv" :
				case "lv_lv" :
					_lang = "lv_LV";
					break;
				case "mk" :
				case "mk_mk" :
					_lang = "mk_MK";
					break;
				case "ml" :
				case "ml_in" :
					_lang = "ml_IN";
					break;
				case "ms" :
				case "ms_my" :
					_lang = "ms_MY";
					break;
				case "nb" :
				case "nb_no" :
					_lang = "nb_NO";
					break;
				case "ne" :
				case "ne_np" :
					_lang = "ne_NP";
					break;
				case "nl" :
				case "nl_nl" :
					_lang = "nl_NL";
					break;
				case "nn" :
				case "nn_no" :
					_lang = "nn_NO";
					break;
				case "pa" :
				case "pa_in" :
					_lang = "pa_IN";
					break;
				case "pl" :
				case "pl_pl" :
					_lang = "pl_PL";
					break;
				case "ps" :
				case "ps_af" :
					_lang = "ps_AF";
					break;
				case "pt" :
				case "pt_br" :
					_lang = "pt_BR";
					break;
				case "pt" :
				case "pt_pt" :
					_lang = "pt_PT";
					break;
				case "ro" :
				case "ro_ro" :
					_lang = "ro_RO";
					break;
				case "ru" :
				case "ru_ru" :
					_lang = "ru_RU";
					break;
				case "sk" :
				case "sk_sk" :
					_lang = "sk_SK";
					break;
				case "sl" :
				case "sl_si" :
					_lang = "sl_SI";
					break;
				case "sq" :
				case "sq_al" :
					_lang = "sq_AL";
					break;
				case "sr" :
				case "sr_rs" :
					_lang = "sr_RS";
					break;
				case "sv" :
				case "sv_se" :
					_lang = "sv_SE";
					break;
				case "sw" :
				case "sw_ke" :
					_lang = "sw_KE";
					break;
				case "ta" :
				case "ta_in" :
					_lang = "ta_IN";
					break;
				case "te" :
				case "te_in" :
					_lang = "te_IN";
					break;
				case "th" :
				case "th_th" :
					_lang = "th_TH";
					break;
				case "tl" :
				case "tl_ph" :
					_lang = "tl_PH";
					break;
				case "tr" :
				case "tr_tr" :
					_lang = "tr_TR";
					break;
				case "uk" :
				case "uk_ua" :
					_lang = "uk_UA";
					break;
				case "vi" :
				case "vi_vn" :
					_lang = "vi_VN";
					break;
				case "zh" :
				case "zh_cn" :
					_lang = "zh_CN";
					break;
				case "zh_hk" :
					_lang = "zh_HK";
					break;
				case "zh_tw" :
					_lang = "zh_TW";
					break;
				default :
					_lang = "en_US";
			}
		};

		function applyListeners( $eventName ) {
			if( _eventList[ $eventName ] === undefined ) {
				return false;
			}
			var list = _eventList[ $eventName ];
			var len = list.length;
			var $params;
			if( arguments[ 1 ] ) {
				$params = [ arguments[ 1 ] ];
			}
			else {
				$params = [];
			}
			for( var i = 0; i < len; i++ ) {
				( list[ i ] ).apply( null, $params );
			}
		};

		function addListener( $eventName, $handler ) {
			if( _eventList[ $eventName ] === undefined ) {
				_eventList[ $eventName ] = [];
			}
			var list = _eventList[ $eventName ];
			if( list.indexOf( $handler ) < 0 ) {
				list.push( $handler );
			}
		};

		function removeListener( $eventName, $handler ) {
			if( _eventList[ $eventName ] === undefined ) {
				return false;
			}

			var list = _eventList[ $eventName ];
			var len = list.length;
			for( var i = 0; i < len; i++ ) {
				if( list[ i ] === $handler ) {
					list.splice( i, 1 );
					return true;
				}
			}
			return false;
		};

		function addEvents() {
			if ( document.addEventListener ) {
				document.addEventListener( "DOMContentLoaded", createFBML );
			} else {
				document.attachEvent( "onreadystatechange", createFBML );
			}
		};

		function removeEvents() {
			if ( document.addEventListener ) {
				document.removeEventListener( "DOMContentLoaded", createFBML );
			} else {
				document.detachEvent( "onreadystatechange", createFBML );
			}
		};

		function createFBML( $event ) {
			if ( document.addEventListener || $event.type === "load" || document.readyState === "complete" ) {
				removeEvents();

				var head = document.getElementsByTagName( "head" )[ 0 ];
				var script = document.createElement( "script" );
				script.text = '(function(d, s, id){ var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) {return;} js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/' + _lang + '/all.js"; fjs.parentNode.insertBefore(js, fjs); }(document, "script", "facebook-jssdk"));';
				if( head.firstChild ) {
					head.insertBefore( script, head.firstChild );
				}
				else {
					head.appendChild( script );
				}

				if( !document.getElementById( "fb-root" ) ) {
					var root = document.createElement( "div" );
					root.setAttribute( "id", "fb-root" );
					if( document.body.firstChild ) {
						document.body.insertBefore( root, document.body.firstChild );
					}
					else {
						document.body.appendChild( root );
					}
				}

				if( window.fbAsyncInit ) {
					_isInit = true;
				}
				else {
					window.fbAsyncInit = function() {
						_isInit = true;

						applyListeners( "init" );
					}
				}

				EZFB.init( function() {
					FB.Event.subscribe( "edge.create", subscribeHandler );
					FB.Event.subscribe( "edge.remove", unsubscribeHandler );
				} );
			}
		};

		function subscribeHandler( $response ) {
			applyListeners( "like", [ $response ] );
		};

		function unsubscribeHandler( $response ) {
			applyListeners( "unlike", [ $response ] );
		};

		function getLoginStatusHandler( $response ) {
			if( $response.status === "connected" ) {
				_loginStatus = "connected";
				_userId = $response.authResponse.userID;
				_accessToken = $response.authResponse.accessToken;
				EZFB.user = null;
				EZFB.api.me( meHandler );
			} else if ( $response.status === "not_authorized" ) {
				_loginStatus = "not_authorized";
				_userId = null;
				_accessToken = null;
				EZFB.user = null;
			} else {
				_loginStatus = "no_login";
				_userId = null;
				_accessToken = null;
				EZFB.user = null;
			}

			applyListeners( "loginStatus", [ $response ] );
		};

		function meHandler( $response ) {
			EZFB.user = $response;
		};

		window.EZFB = ( {
			/* ====================================================================================================

			 Initialize

			 ==================================================================================================== */
			_init: function() {
				checkLanguage();
				if( document.body ) {
					createFB();
				}
				else {
					addEvents();
				}
				return this;
			},
			appInit: function( $appIdOrOptions /*, $cookie, $logging, $status, $xfbml, $channelUrl, $authResponse, $frictionlessRequests, $hideFlashCallback  */ ) {
				if( typeof $appIdOrOptions == "object" ) {
					_opts = $appIdOrOptions;
					_appId = _opts[ "appId" ];
				}
				else {
					var $cookie = arguments[ 1 ] ? arguments[ 1 ] : false;
					var $logging = arguments[ 2 ] ? arguments[ 2 ] : true;
					var $status = arguments[ 3 ] ? arguments[ 3 ] : true;
					var $xfbml = arguments[ 4 ] ? arguments[ 4 ] : false;
					var $channelUrl = arguments[ 5 ] ? arguments[ 5 ] : null;
					var $authResponse = arguments[ 6 ] ? arguments[ 6 ] : true;
					var $frictionlessRequests = arguments[ 7 ] ? arguments[ 7 ] : false;
					var $hideFlashCallback = arguments[ 8 ] ? arguments[ 8 ] : null;

					_opts = {
						appId : $appIdOrOptions,
						cookie : $cookie,
						logging : $logging,
						status : $status,
						xfbml : $xfbml,
						channelUrl : $channelUrl,
						authResponse : $authResponse,
						frictionlessRequests : $frictionlessRequests,
						hideFlashCallback : $hideFlashCallback
					};

					_appId = $appIdOrOptions;
				}

				if( _isInit ) {
					FB.init( _opts );
				}
				else {
					this.init( function() {
						FB.init( _opts );
					} );
				}
				this.init( this.update );
				this.init( this.callLoginStatus );

				return this;
			},
			/* ====================================================================================================

			 Public Instance

			 ==================================================================================================== */
			api: {
				loginStatus: function( $listener ) {
					if( $listener ) {
						EZFB.event.bind( "loginStatus", $listener );
					}

					FB.getLoginStatus( getLoginStatusHandler );
					return EZFB;
				},
				me: function( $listener ) {
					if( $listener ) {
						EZFB.event.bind( "me", $listener );
					}
					FB.api( "/me", function( $response ) {
						EZFB.user = $response;
						applyListeners( "me", $response );
					} );
					return EZFB;
				},
				deauth: function( $permission, $listener ) {
					if( $permission === undefined ) {
						$permission = "";
					}
					var arr = $permission.split( " " );
					var len = arr.length;
					var done = 0;
					if( $listener ) {
						EZFB.event.bind( "deauth", $listener );
					}

					for( var i = 0; i < len; i++ ) {
						FB.api( "/me/permissions/" + arr[ i ], "DELETE", function( $response ) {
							done++;
							if( done == len ) {
								applyListeners( "deauth" );
								EZFB.api.loginStatus();
							}
						} );
					}
				},
				login: function( $scope, $listenerOrRedirectUrl ) {
					var type = typeof $listenerOrRedirectUrl;
					if( type == "string" ) {
						var url = "https://www.facebook.com/dialog/oauth?client_id=%a&redirect_uri=%u&scope=%s";
						url = url.replace( "%a", _appId );
						url = url.replace( "%u", $listenerOrRedirectUrl );
						url = url.replace( "%s", $scope );

						window.top.location.href = url;
						return this;
					}

					if( type == "function" ) {
						EZFB.event.bind( "login", $listenerOrRedirectUrl );
					}
					FB.login( function( $response ) {
						applyListeners( "login", $response );
						EZFB.api.loginStatus();
					}, { scope: $scope } );
					return EZFB;
				},
				logout: function( $listener ) {
					if( $listener ) {
						EZFB.event.bind( "logout", $listener );
					}
					FB.logout( function( $response ) {
						applyListeners( "logout", $response );
						EZFB.api.loginStatus();
					} );
					return EZFB;
				}
			},
			event: {
				bind: function( $eventName, $listener ) {
					$arr = $eventName.split( " " );
					var len = $arr.length;
					for( var i = 0; i < len; i++ ) {
						$eventName = $arr[ i ];
						addListener( $eventName, $listener );
					}
					return this;
				},
				unbind: function( $eventName, $listener ) {
					$arr = $eventName.split( " " );
					for( var i = 0; i < len; i++ ) {
						$eventName = $arr[ i ];
						removeListener( $listener );
					}
					return this;
				},init: function( $listener ) {
					if( _isInit ) {
						$listener.apply( null );
					}
					else {
						EZFB.event.bind( "init", $listener );
					}
					return EZFB;
				},
				removeInit: function( $listener ) {
					EZFB.event.unbind( "init", $listener );
					return EZFB;
				},
				like: function( $listener ) {
					EZFB.event.bind( "like", $listener );
					return EZFB;
				},
				removeLike: function( $listener ) {
					EZFB.event.unbind( "like", $listener );
					return EZFB;
				},
				unlike: function( $listener ) {
					EZFB.event.bind( "unlike", $listener );
					return EZFB;
				},
				removeUnlike: function( $listener ) {
					EZFB.event.unbind( "unlike", $listener );
					return EZFB;
				},
				loginStatus: function( $listener ) {
					EZFB.event.bind( "loginStatus", $listener );
					return EZFB;
				},
				removeLoginStatus: function( $listener ) {
					EZFB.event.unbind( "loginStatus", $listener );
					return EZFB;
				},
				me: function( $listener ) {
					EZFB.event.bind( "me", $listener );
					return EZFB;
				},
				removeMe: function( $listener ) {
					EZFB.event.unbind( "me", $listener );
					return EZFB;
				},
				login: function( $listener ) {
					EZFB.event.bind( "login", $listener );
					return EZFB;
				},
				removeLogin: function( $listener ) {
					EZFB.event.unbind( "login", $listener );
					return EZFB;
				},
				logout: function( $listener ) {
					EZFB.event.bind( "logout", $listener );
					return EZFB;
				},
				removeLogout: function( $listener ) {
					EZFB.event.unbind( "logout", $listener );
					return EZFB;
				},
				deauth: function( $listener ) {
					EZFB.event.bind( "deauth", $listener );
					return EZFB;
				},
				removeDeauth: function( $listener ) {
					EZFB.event.unbind( "deauth", $listener );
					return EZFB;
				}
			},
			user: null,
			/* ====================================================================================================

			 Event Methods

			 ==================================================================================================== */
			bind: function( $eventName, $listener ) {
				return EZFB.event.bind( $eventName, $listener );
			},
			unbind: function( $eventName, $listener ) {
				return EZFB.event.unbind( $eventName, $listener );
			},
			init: function( $listener ) {
				return EZFB.event.init( $listener );
			},
			removeInit: function( $listener ) {
				return EZFB.event.removeInit( $listener );
			},
			like: function( $listener ) {
				return EZFB.event.like( $listener );
			},
			removeLike: function( $listener ) {
				return EZFB.event.removeLike( $listener );
			},
			unlike: function( $listener ) {
				return EZFB.event.unlike( $listener );
			},
			removeUnlike: function( $listener ) {
				return EZFB.event.removeUnlike( $listener );
			},
			loginStatus: function( $listener ) {
				return EZFB.event.loginStatus( $listener );
			},
			removeLoginStatus: function( $listener ) {
				return EZFB.event.removeLoginStatus( $listener );
			},
			/* ====================================================================================================

			 Util Methods

			 ==================================================================================================== */
			update: function() {
				FB.XFBML.parse();
				return this;
			},
			canvasAutosize: function() {
				FB.Canvas.setSize();
				FB.Canvas.setAutoGrow();
				return this;
			},
			callLoginStatus: function() {
				return EZFB.api.loginStatus();
			},
			getLoginStatus: function() {
				return _loginStatus;
			},
			getUserId: function() {
				return _userId;
			},
			getAccessToken: function() {
				return _accessToken;
			},
			login: function( $scope, $listenerOrRedirectUrl ) {
				return EZFB.api.login( $scope, $listenerOrRedirectUrl );
			},
			logout: function( $listener ) {
				return EZFB.api.logout( $listener );
			}
		} )._init();
	}
} )();