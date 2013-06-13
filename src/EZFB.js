/*!
 * EZFB v0.1
 * http://grotesq.com
 *
 * Author : Kim Naram ( a.k.a. Unknown )
 * Email : unknown@grotesq.com
 *
 * Copyright 2007-2013 The GrotesQ
 * Released under the MIT license
 *
 * Date: 2013-06-06 16:20
 */
;( function() {
	if( !window.EZFB ) {
		
		/*
		
			Private Variables
			
		*/
		
		var _isInit = false;
		var _appId;
		var _loginStatus = "not_ready";
		var _userId;
		var _accessToken;
		
		var _asyncInitHandlerList = [];
		var _likeHandlerList = [];
		var _unlikeHandlerList = [];
		var _loginStatusHandlerList = [];
		
		/*
		
			Private Functions ( and Handlers )
		
		*/
		
		function applyHandlerList( $list /*, $params */ ) {
			var len = $list.length;
			var $params;
			if( arguments[ 1 ] ) {
				$params = arguments[ 1 ];
			}
			else {
				$params = [];
			}
			for( var i = 0; i < len; i++ ) {
				( $list[ i ] ).apply( null, $params );
			}
		};
		
		function removeHandler( $list, $handler ) {
			var len = $list.length;
			for( var i = 0; i < len; i++ ) {
				if( $list[ i ] === $handler ) {
					$list.splice( i, 1 );
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
		
		function createFBML() {
			if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
				removeEvents();
									
				var script = document.createElement( "script" );
				script.innerHTML = '(function(d, s, id){ var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) {return;} js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/ko_KR/all.js"; fjs.parentNode.insertBefore(js, fjs); }(document, "script", "facebook-jssdk"));';
				document.head.insertBefore( script, document.head.firstChild );
				
				if( !document.getElementById( "fb-root" ) ) {
					var root = document.createElement( "div" );
					root.setAttribute( "id", "fb-root" );
					document.body.insertBefore( root, document.body.firstChild );
				}
				
				if( window.fbAsyncInit ) {
					_isInit = true;
				}
				else {
					window.fbAsyncInit = function() {
						_isInit = true;
						
						applyHandlerList( _asyncInitHandlerList );
					}
				}
				
				EZFB.init( function() {					
					FB.Event.subscribe( "edge.create", subscribeHandler );
					FB.Event.subscribe( "edge.remove", unsubscribeHandler );
				} );
			}
		};
		
		function subscribeHandler( $response ) {
			applyHandlerList( _likeHandlerList, [ $response ] );
		};
		
		function unsubscribeHandler( $response ) {
			applyHandlerList( _unlikeHandlerList, [ $response ] );
		};
		
		window.EZFB = ( {
			/*
			
				Initialize
			
			*/
			_init: function() {
				if( document.body ) {
					createFB();
				}
				else {
					addEvents();
				}
				return this;
			},
			appInit: function( $appIdOrOptions /*, $cookie, $logging, $status, $xfbml, $channelUrl, $authResponse, $frictionlessRequests, $hideFlashCallback  */ ) {
				var opts;
				if( typeof $appIdOrOptions == "object" ) {
					opts = $appIdOrOptions;
					_appId = opts[ "appId" ];
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
					
					opts = {
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
					FB.init( opts );
				}
				else {
					this.init( function() {
						FB.init( opts );
					} );
				}
				this.init( this.update );
				this.init( this.callLoginStatus );
				
				return this;
			},
			/*
			
				Event Methods
				
			*/
			bind: function( $eventName, $handler ) {
				$arr = $eventName.split( " " );
				var len = $arr.length;
				for( var i = 0; i < len; i++ ) {
					$eventName = $arr[ i ];
					if( this[ $eventName ] ) {
						( this[ $eventName ] ).apply( null, [ $handler ] );
					}
				}
				return this;
			},
			unbind: function( $eventName, $handler ) {
				$arr = $eventName.split( " " );
				for( var i = 0; i < len; i++ ) {
					$eventName = "remove" + $eventName.charAt( 0 ).toUpperCase() + $eventName.slice( 1 );
					if( this[ $eventName ] ) {
						( this[ $eventName ] ).apply( null, [ $handler ] );
					}
				}
				return this;
			},
			init: function( $handler ) {
				if( _isInit ) {
					$handler.apply( null );
				}
				else {
					_asyncInitHandlerList.push( $handler );
				}
				return this;
			},
			removeInit: function( $handler ) {
				removeHandler( _asyncInitHandlerList, $handler );
				return this;
			},
			like: function( $handler ) {
				_likeHandlerList.push( $handler );
				return this;
			},
			removeLike: function( $handler ) {
				removeHandler( _likeHandlerList, $handler );
				return this;
			},
			unlike: function( $handler ) {
				_unlikeHandlerList.push( $handler );
				return this;
			},
			removeUnlike: function( $handler ) {
				removeHandler( _unlikeHandlerList, $handler );
				return this;
			},
			loginStatus: function( $handler ) {
				_loginStatusHandlerList.push( $handler );
				return this;
			},
			removeLoginStatus: function( $handler ) {
				removeHandler( _loginStatusHandlerList, $handler );
				return this;
			},
			/*
			
				Util Methods
				
			*/
			update: function() {
				FB.XFBML.parse();
			},
			canvasAutosize: function() {
				FB.Canvas.setSize();
				FB.Canvas.setAutoGrow();
			},
			callLoginStatus: function() {
				FB.getLoginStatus( function( $response ) {
					if( $response.status === "connected" ) {
						_loginStatus = "connected";
						_userId = $response.authResponse.userID;
						_accessToken = $response.authResponse.accessToken;
					} else if ( $response.status === "not_authorized" ) {
						_loginStatus = "not_authorized";
						_userId = null;
						_accessToken = null;
					} else {
						_loginStatus = "no_login";
						_userId = null;
						_accessToken = null;
					}
					
					applyHandlerList( _loginStatusHandlerList, [ $response ] );
				} );
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
			login: function( $scope, $handlerOrRedirectUrl ) {
				if( typeof $handlerOrRedirectUrl != "string" ) {
					FB.login( $handlerOrRedirectUrl, { scope: $scope } );
				}
				else {
					var url = "https://www.facebook.com/dialog/oauth?client_id=%a&redirect_uri=%u&scope=%s";
					url = url.replace( "%a", _appId );
					url = url.replace( "%u", $handlerOrRedirectUrl );
					url = url.replace( "%s", $scope );
					
					window.top.location.href = url;
				}
			}
		} )._init();
	}
} )();