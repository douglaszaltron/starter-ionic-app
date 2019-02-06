/**
 * @description Protótipo que agrupa uma coleção de items por uma chave.
 * @param {string} key Uma chave que exista no objeto do item da lista.
 */
Array.prototype.groupBy = function(key) {
  var collection = {};

  this.forEach(function(item, index) {
    var groups;

    if (angular.isFunction(key)) {
      groups = key(item, index);
    } else if (item[key] || item[key] === 0) {
      groups = item[key];
    } else {
      groups = "";
    }

    if (angular.isUndefined(collection[groups])) {
      collection[groups] = [];
    }

    collection[groups].push(item);
  });

  return collection;
};

/**
 * @description Protótipo que divide uma coleção em uma lista de listas que não excedem o tamanho determinado.
 * @param {number} size O número de elementos a serem coletados em cada lista deve ser positivo e ser maior que o número de elementos nessa coleção.
 */
Array.prototype.chunk = function(size) {
  var chunks = [];
  var index = 0;
  do {
    var items = this.slice(index, index + size);
    if (items.length) {
      chunks.push(items);
    }
    index += size;
  } while (index < this.length);
  return chunks;
};

/**
 * @description Protótipo para ordenar uma lista por LocaleCompare
 * @param {array} items
 * @param {string} [value]
 * @returns {array} Array contendo a lista em ordem alfabética ordenado pelo value
 */
Array.prototype.sortByLocaleCompare = function(items, value) {
  var collection = [].concat(items);
  if (value) {
    collection.sort(function(a, b) {
      return a[value].localeCompare(b[value]);
    });
  } else {
    collection.sort(function(a, b) {
      return a.localeCompare(b);
    });
  }
  return collection;
};

/**
 * @description Protótipo para normalizar a string para remover a acentuação.
 */
String.prototype.latinise = function() {
  // eslint-disable-next-line prettier/prettier
  var translate = { "à":"a", "á":"a", "â":"a", "ã":"a", "ä":"a", "å":"a", "æ":"a", "ç":"c", "è":"e", "é":"e", "ê":"e", "ë":"e", "ì":"i", "í":"i", "î":"i", "ï":"i", "ð":"d", "ñ":"n", "ò":"o", "ó":"o", "ô":"o", "õ":"o", "ö":"o", "ø":"o", "ù":"u", "ú":"u", "û":"u", "ü":"u", "ý":"y", "þ":"b", "ß":"s", "ÿ":"y", "ŕ":"r" };
  var translate_re = /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþßÿŕ]/gim;
  return this.replace(translate_re, function(match) {
    return translate[match];
  });
};

/**
 * @description Determina se uma referência é indefinida ou nula.
 */
angular.isUndefinedOrNull = function(val) {
  return angular.isUndefined(val) || val === null;
};

/**
 * @description Determina se uma referência é definida ou nula.
 */
angular.isDefinedOrNotNull = function(val) {
  return angular.isDefined(val) || val !== null;
};
