"use strict";
Object.defineProperty(exports,"__esModule",{value:true});
var Type;
(function (Type){
  Type["ObjectId"]="ObjectId";
  Type["Date"]="date";
  Type["Boolean"]="boolean";
  Type["Number"]="number";
  Type["Integer"]="integer";
  Type["String"]="string";
  Type["Text"]="text";
  Type["Object"]="object";
  Type["Array"]="array";
  Type["Primitives"]="primitives";
  Type["Binary"]="binary";
})(Type=exports.Type || (exports.Type={}));
var Format;
(function (Format){
  Format["Currency"]="currency";
  Format["Phone"]="phone";
  Format["Fax"]="fax";
})(Format=exports.Format || (exports.Format={}));
function build(model){
  if (model && !model.source){
    model.source=model.name;
  }
  var meta={ model: model };
  var pks=new Array();
  var dateFields=new Array();
  var integerFields=new Array();
  var numberFields=new Array();
  var currencyFields=new Array();
  var phoneFields=new Array();
  var faxFields=new Array();
  var objectFields=new Array();
  var arrayFields=new Array();
  var keys=Object.keys(model.attributes);
  for (var _i=0, keys_1=keys; _i < keys_1.length; _i++){
    var key=keys_1[_i];
    var attr=model.attributes[key];
    if (attr){
      attr.name=key;
      if (attr.version){
        meta.version=attr.name;
      }
      if (attr.ignored !== true){
        if (attr.key){
          pks.push(attr.name);
        }
      }
      switch (attr.type){
        case Type.String: {
          switch (attr.format){
            case Format.Phone:
              phoneFields.push(attr.name);
              break;
            case Format.Fax:
              faxFields.push(attr.name);
              break;
            default:
              break;
          }
          break;
        }
        case Type.Number: {
          switch (attr.format){
            case Format.Currency:
              currencyFields.push(attr.name);
              break;
            default:
              numberFields.push(attr.name);
              break;
          }
          break;
        }
        case Type.Integer: {
          integerFields.push(attr.name);
          break;
        }
        case Type.Date: {
          dateFields.push(attr.name);
          break;
        }
        case Type.Object: {
          if (attr.typeof){
            var x=build(attr.typeof);
            x.attributeName=key;
            objectFields.push(x);
          }
          break;
        }
        case Type.Array: {
          if (attr.typeof){
            var y=build(attr.typeof);
            y.attributeName=key;
            arrayFields.push(y);
          }
          break;
        }
        default:
          break;
      }
    }
  }
  if (pks.length > 0){
    meta.keys=pks;
  }
  if (dateFields.length > 0){
    meta.dateFields=dateFields;
  }
  if (integerFields.length > 0){
    meta.integerFields=integerFields;
  }
  if (numberFields.length > 0){
    meta.numberFields=numberFields;
  }
  if (currencyFields.length > 0){
    meta.currencyFields=currencyFields;
  }
  if (phoneFields.length > 0){
    meta.phoneFields=phoneFields;
  }
  if (faxFields.length > 0){
    meta.faxFields=faxFields;
  }
  if (objectFields.length > 0){
    meta.objectFields=objectFields;
  }
  if (arrayFields.length > 0){
    meta.arrayFields=arrayFields;
  }
  return meta;
}
exports.build=build;
