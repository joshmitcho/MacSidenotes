QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "deepEqual test", function( assert ) {

  assert.deepEqual( getURL(), pageURL, "URLs must match" );
});