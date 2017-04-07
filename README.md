[![npm version](https://badge.fury.io/js/solwr.svg)](https://badge.fury.io/js/solwr)
# Solwr

Solr nodejs wrapper, mongoose inspired

## Getting Started
### Prerequisites

* Solr >= 5

You should install solr server
* https://www.digitalocean.com/community/tutorials/how-to-install-solr-5-2-1-on-ubuntu-14-04
* create cores with below commands before running tests
```
solr create_core -c querytest
solr create_core -c products
```

### Installing

```
npm install --save solwr
```

## Running the tests

```
npm run test
```

## Example

Performing create core, you should create core on server

#### config server
```
solwr.address( {
  host: "http://<ip or domain>",
  port: <port>
} );
```

#### get core
```
solwr.core(<core_name>, <opts>)

// return core
var users = solwr.core('users');

you try duplicate core throw duplicate error.

opts
* wt //request and respones type (json, xml)
```

#### remove core
```
users.removeCore()
     .exec()
     .then(<success_callback>)
     .then(null, <error_callback>);


alternatively

users.removeCore(function(err, data){
 if(err) handle err
});
```

#### create document
```
users.create({id: '1', name: 'omer'}, <opts>)
     .exec()
     .then(<success_callback>)
     .then(null, <error_callback>)


//document array
users.create([{id: '1', name: 'omer'}, {id: '2', name: 'markakod'}], <opts>)
     .exec()
     .then(<success_callback>)
     .then(null, <error_callback>)


this alternative is usable all of query

users.create({id: '1', name: 'omer'}, function(err, data){
  if(err) handle err
});


opts
* dataFormat //json, xml
```

#### find
```
//get documents by query
users.find("*:*", <opts>)
     .exec()
     .then(function(_users){
       //use response users
     })
     .then(null, function(err){
       //handle error
     })

opts
* format //json, xml
```

#### only
```
//if you want only data, response contains
users.find("*:*", <opts>)
     .only()
     .exec()
     .then(<success_callback>)
     .then(null, <error_callback>)

opts
* format //json, xml

xml response is not parsed, is string
```

#### sort
```
//get documents by query
users.find("*:*")
     .sort("id desc")
     .only()
     .exec()
     .then(<success_callback>)
     .then(null, <error_callback>)

opts
* format //json, xml
```

#### limit
```
//get documents by query
users.find("*:*", <opts>)
     .limit(4)
     .exec()
     .then(<success_callback>)
     .then(null, <error_callback>)

opts
* format //json, xml
```

#### skip
```
//get documents by query
users.find("*:*", <opts>)
     .skip(100)
     .exec()
     .then(<success_callback>)
     .then(null, <error_callback>)

if you want, you can pagination with skip and limit functions

opts
* format //json, xml
```

#### remove document
```
//get documents by query
users.remove("id:1", <opts>)
     .exec()
     .then(<success_callback>)
     .then(null, <error_callback>)

opts
* format //json, xml
```

### Built With

* [Axios](https://github.com/mzabriskie/axios) - request library


### Built With
heavily inspired by mongoose


## License

MIT
