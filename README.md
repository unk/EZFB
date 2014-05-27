#EZFB 0.0.5

Last modified : 2014-05-27

##Index of content

1. [Overview](#overview)
2. [Usage](#usage)
	- [시작하기](#%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0)
	- [초기화이벤트](#%EC%B4%88%EA%B8%B0%ED%99%94-%EC%9D%B4%EB%B2%A4%ED%8A%B8)
	- [페이스북 로그인 하기](%ED%8E%98%EC%9D%B4%EC%8A%A4%EB%B6%81-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%95%98%EA%B8%B0)
	- [좋아요 버튼 이벤트 활용하기](#%EC%A2%8B%EC%95%84%EC%9A%94-%EB%B2%84%ED%8A%BC-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0)
	- [여러개의 이벤트 동시에 등록, 해제하기](#%EC%97%AC%EB%9F%AC%EA%B0%9C%EC%9D%98-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%8F%99%EC%8B%9C%EC%97%90-%EB%93%B1%EB%A1%9D-%ED%95%B4%EC%A0%9C%ED%95%98%EA%B8%B0)
	- [메소드 체인](#%EB%A9%94%EC%86%8C%EB%93%9C-%EC%B2%B4%EC%9D%B8)
3. [API Reference](#api-reference)
4. [Contact](#contact)
5. [Lisence](#lisence)

##Overview

EZFB는 JavaScript용 Facebook SDK 도우미입니다.
JS를 이용해 페이스북 관련 앱이나 웹을 만들 때 도움이 됩니다.

##Usage

###시작하기

EZFB은 아주 쉽게 시작할 수 있습니다. 아래의 코드를 HTML 페이지 어디에든 삽입하면 됩니다. <head>태그에 넣어도 되고 <body> 태그에 넣어도 됩니다. <body> 태그의 시작 부분에 넣어도 끝 부분에 넣어도 아무 상관 없습니다.

	<script type="text/javascript" src="EZFB.min.js"></script>
	<script type="text/javascript">
		EZFB.appInit( 'YOUR_APP_ID' );
	</script>

###초기화 이벤트

페이스북 서버에서 SDK 파일을 로드해오기 때문에 이벤트를 통해서 초기화 시점을 알 수 있습니다.

	EZFB.appInit( 'YOUR_APP_ID' );
	EZFB.init( initHandler );
	EZFB.init( setCanvas ); // 여러개의 콜백을 등록할 수도 있습니다.
 
	function initHandler() {
    	console.log( 'init!' );
	}
 
	function setCanvas() {
    	EZFB.canvasAutosize();
	}

이미 초기화가 된 상태라면 등록되는 콜백 함수가 바로 실행됩니다.

###페이스북 로그인 하기

페이스북 로그인 팝업을 띄우거나, 로그인 화면으로 이동시킬 수 있습니다.
웹 페이지일 경우 팝업이 뜨게 되고, 앱 페이지일 경우 모달 팝업 형태로 로그인 창이 나타납니다.
모바일의 경우 팝업으로 뜬 창에서 로그인 완료에 대한 콜백을 받을 수 없으므로, 리디렉트 주소를 이용하는 편이 좋습니다.

퍼미션에 대한 요청이 필요할 수 있습니다.
퍼미션의 종류에 대해서는 [페이스북 개발자 센터의 로그인 퍼미션 페이지](http://developers.facebook.com/docs/reference/login/#permissions)를 참조하세요.

	EZFB.appInit( 'YOUR_APP_ID' );
 
	// 두번재 인자가 함수일 경우 팝업으로 로그인 창을 띄우고 로그인 시 콜백으로 실행됩니다.
	EZFB.login( 'email,user_likes', function( $response ) {
    	console.log( $response );
	} );
 
	// 두번째 인자가 주소일 경우 리디렉트 처리가 됩니다.
	EZFB.login( 'email,user_likes', 'http://grotesq.com/ezfb' );
	
###좋아요 버튼 이벤트 활용하기

현재 페이지 내의 좋아요 버튼을 누를 때와 취소할 때에 대한 이벤트를 사용할 수 있습니다.

	// 이벤트를 추가합니다.
	EZFB.like( likeHandler );
	EZFB.unlike( unlikeHandler );
	 
	function likeHandler() {
		alert( '이 페이지를 좋아해 주셔서 감사합니다!' );
	 
		// 이벤트를 제거합니다.
		EZFB.removeLike( likeHandler );
	}
	 
	function unlikeHandler() {
		alert( '이 페이지를 안 좋아하시는군요..' );
	}

###여러개의 이벤트 동시에 등록, 해제하기

on()을 이용해 여러개의 이벤트를 동시에 등록하고 해제할 수 있습니다.
여러개의 이벤트를 등록할 때에 이벤트 이름은 띄어쓰기로 구분합니다.

	EZFB.on( 'like unlike', likeHandler );
	 
	function likeHandler() {
		window.location.reload();
	}

###메소드 체인

대부분의 메소드는 자기 자신을 반환하기 때문에, 메소드 체인 형태의 코드 작성을 하실 수 있습니다.

	EZFB.init( function(){} ).appInit( 'YOUR_APP_ID' );

##API Reference

[wiki](https://github.com/Unk/EZFB/wiki)를 이용해서 정리하고 있습니다. [[링크]](https://github.com/Unk/EZFB/wiki)
	
##Contact

- [Facebook](www.facebook.com/pages/EZFB/611988845501116)
- Email : [unknown@grotesq.com](mailto:unknown@grotesq.com)

##Lisence

[MIT 라이센스](http://opensource.org/licenses/MIT)를 따릅니다. 자유롭게 이용하세요.