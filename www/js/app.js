(function () {

    'use strict';

    var app = angular.module('orate', ['ionic', 'ngCordova']);

    app.run(function ($ionicPlatform) {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    app.controller('app-controller', function ($scope, $state) {
        
        $scope.debug = true;
        
        $scope.menu = [
            {
                title: 'Home',
                toState: function () {
                    $state.go('index.home');
                }
            },
            {
                title: 'Readings',
                toState: function () {
                    $state.go('index.readings');
                }
            },
            {
                title: 'Prayers',
                toState: function () {
                    $state.go('index.prayers');
                }
            },
            {
                title: 'Confession',
                toState: function () {
                    $state.go('index.confession');
                }
            },
            {
                title: 'Settings',
                toState: function () {
                    $state.go('index.settings');
                }
            }
        ];
        
        function getDate() {
            $scope.date = Date.now();
        }

        $scope.$on('$ionicView.beforeEnter', getDate);
        
    });
    
    app.controller('home-controller', function ($scope, $state) {
        
    });
    
    app.controller('readings-controller', function ($scope, $state) {
        
        $scope.hideBackButton = true;
        $scope.title = 'Readings';
        $scope.menu = [
            {
                title: 'Daily Readings',
                toState: function () {
                    $state.go('index.daily-readings');
                }
            },
            {
                title: 'Saints of the Day',
                toState: function () {
                    $state.go('index.saints');
                }
            },
            {
                title: 'Reflections',
                toState: function () {
                    $state.go('index.reflections');
                }
            }
        ];
    });
    
    app.controller('daily-readings-controller', function ($scope, $state, $ionicLoading, $http, $filter) {
        
        function getReadings() {
            $ionicLoading.show();
            $scope.readings = [];
            var date = $filter('date')($scope.date, 'MMddyy');
            var url = 'http://www.usccb.org/bible/readings/' + date + '.cfm';
            function onSuccess(response) {
                var content, re, match, abbr, reference;
                content = $(response.data).find('#cs_control_3684').find('.CS_Textblock_Text').prop('outerHTML');
                re = /<h4>([\w\s]+) <a href="[\w\/:]+">([\w\s:\-—,;]+)<\/a>[\s]*<\/h4>[\s]*(?:<div class="poetry">)?[\s]*([\w\W]*?(?=(?:<h4>)|(?:<\/div>)))/g;
                abbr = [];
                function populateAbbr(abbr) {
                    abbr['Gn'] = 'Genesis'; // 1
                    abbr['Ex'] = 'Exodus'; // 2
                    abbr['Lv'] = 'Leviticus'; // 3
                    abbr['Nm'] = 'Numbers'; // 4
                    abbr['Dt'] = 'Deuteronomy'; // 5
                    abbr['Jos'] = 'Joshua'; // 6
                    abbr['Jgs'] = 'Judges'; // 7
                    abbr['Ru'] = 'Ruth'; // 8
                    abbr['1 Sm'] = '1 Samuel'; // 9
                    abbr['2 Sm'] = '2 Samuel'; // 10
                    abbr['1 Kgs'] = '1 Kings'; // 11
                    abbr['2 Kgs'] = '2 Kings'; // 12
                    abbr['1 Chr'] = '1 Chronicles' // 13
                    abbr['2 Chr'] = '2 Chronicles' // 14
                    abbr['Ezr'] = 'Ezra'; // 15
                    abbr['Neh'] = 'Nehemiah'; // 16
                    abbr['Tb'] = 'Tobit'; // 17
                    abbr['Jdt'] = 'Judith'; // 18
                    abbr['Est'] = 'Esther'; // 19
                    abbr['1 Mc'] = '1 Maccabees'; // 20
                    abbr['2 Mc'] = '2 Maccabees'; // 21
                    abbr['Jb'] = 'Job'; // 22
                    abbr['Ps'] = 'Psalms'; // 23
                    abbr['PS'] = 'Psalms'; // 23
                    abbr['Prv'] = 'Proverbs'; // 24
                    abbr['Eccl'] = 'Ecclesiastes'; // 25
                    abbr['Sg'] = 'Song of Songs'; // 26
                    abbr['Wis'] = 'Wisdom'; // 27
                    abbr['Sir'] = 'Sirach'; // 28
                    abbr['Is'] = 'Isaiah'; // 29
                    abbr['Jer'] = 'Jeremiah'; // 30
                    abbr['Lam'] = 'Lamentations'; // 31
                    abbr['Bar'] = 'Baruch'; // 32
                    abbr['Ez'] = 'Ezekiel'; // 33
                    abbr['Dn'] = 'Daniel'; // 34
                    abbr['Hos'] = 'Hosea'; // 35
                    abbr['Jl'] = 'Joel'; // 36
                    abbr['Am'] = 'Amos'; // 37
                    abbr['Ob'] = 'Obadiah'; // 38
                    abbr['Jon'] = 'Jonah'; // 39
                    abbr['Mi'] = 'Micah'; // 40
                    abbr['Na'] = 'Nahum'; // 41
                    abbr['Hab'] = 'Habakkuk'; // 42
                    abbr['Zep'] = 'Zephaniah'; // 43
                    abbr['Hag'] = 'Haggai'; // 44
                    abbr['Zec'] = 'Zechariah'; // 45
                    abbr['Mal'] = 'Malachi'; // 46
                    abbr['Mt'] = 'Matthew'; // 1
                    abbr['Mk'] = 'Mark'; // 2
                    abbr['Lk'] = 'Luke'; // 3
                    abbr['Jn'] = 'John'; // 4
                    abbr['Acts'] = 'Acts'; // 5
                    abbr['Rom'] = 'Romans'; // 6
                    abbr['1 Cor'] = '1 Corinthians' // 7
                    abbr['2 Cor'] = '2 Corinthians' // 8
                    abbr['Gal'] = 'Galatians'; // 9
                    abbr['Eph'] = 'Ephesians'; // 10
                    abbr['Phil'] = 'Philippians'; // 11
                    abbr['Col'] = 'Colossians'; // 12
                    abbr['1 Thess'] = '1 Thessalonians' // 13
                    abbr['2 Thess'] = '2 Thessalonians' // 14
                    abbr['1 Tm'] = '1 Timothy'; // 15
                    abbr['2 Tm'] = '2 Timothy'; // 16
                    abbr['Ti'] = 'Titus'; // 17
                    abbr['Phlm'] = 'Philemon'; // 18
                    abbr['Heb'] = 'Hebrews'; // 19
                    abbr['Jas'] = 'James' // 20
                    abbr['1 Pt'] = '1 Peter' // 21
                    abbr['2 Pt'] = '2 Peter' // 22
                    abbr['1 Jn'] = '1 John'; // 23
                    abbr['2 Jn'] = '2 John'; // 24
                    abbr['3 Jn'] = '3 John'; // 25
                    abbr['Jude'] = 'Jude'; // 26
                    abbr['Rev'] = 'Revelation'; // 27
                }
                populateAbbr(abbr);
                while (match = re.exec(content)) {
                    reference = match[2].replace(/([\w]*?)(?= \d+:)/g, function (a) { return abbr[a] ? abbr[a] : a; });
                    $scope.readings.push({
                        title: match[1],
                        reference: reference,
                        body: match[3]
                    });
                };
                $ionicLoading.hide();
            }
            function onFailure(response) {
                $ionicLoading.hide();
            }
            $http.get(url).then(onSuccess, onFailure);
        }
        
        $scope.$on('$ionicView.beforeEnter', getReadings);
    });
    
    app.controller('reflections-controller', function ($scope, $state) {
        
        $scope.hideBackButton = false;
        $scope.title = 'Reflections';
        $scope.menu = [
            {
                title: 'Living Faith',
                toState: function () {
                    $state.go('index.reflection-living-faith');
                }
            },
            {
                title: 'Daily Scripture',
                toState: function () {
                    $state.go('index.reflection-daily-scripture');
                }
            }
        ];
    });
    
    app.controller('reflection-living-faith-controller', function ($scope, $state, $ionicLoading, $http, $filter) {
        
        function getReflection() {
            $ionicLoading.show();
            var date = $filter('date')($scope.date, 'MM-dd-yyyy');
            var url = 'https://www.livingfaith.com/devotion-' + date;
            function onSuccess(response) {
                var data, heading, feast, scripture, citation, devotion, author;
                data = $(response.data).find('#devotion_container');
                heading = $(data).find('.dev_heading').html();
                heading = heading.substring(1, heading.length - 1);
                feast = $(data).find('.dev_feast').html();
                scripture = $(data).find('.dev_scripture').html();
                citation = $(data).find('.dev_citation').html().substring(2);
                devotion = $(data).find('.dev_body').html();
                author = $(data).find('.dev_author').html().substring(2);
                $scope.reflection = {
                    title: heading,
                    feast: feast,
                    scripture: scripture,
                    citation: citation,
                    devotion: devotion,
                    author: author
                };
                $ionicLoading.hide();
            }
            function onFailure(response) {
                $ionicLoading.hide();
            }
            $http.get(url).then(onSuccess, onFailure);
        }
        
        $scope.$on('$ionicView.beforeEnter', getReflection);
    });
    
    app.controller('reflection-daily-scripture-controller', function ($scope, $state, $ionicLoading, $http, $filter) {
        
        function getReflection() {
            $ionicLoading.show();
            var date = $filter('date')($scope.date, 'MMMd').toLowerCase();
            var url = 'http://www.rc.net/wcc/readings/' + date + '.htm';
            function onSuccess(response) {
                var data, re, match, title, devotion, divider;
                data = response.data;
                re = /<center>.*?(?=<b>)<b>[\s]?([\w\W]*?)(?=<\/b>)[\w\W]*(?=Meditation:)Meditation:[\s]*<\/b>([\w\W]*)(?=<p><b>Psalm)[\w\W]*(?=Daily Quote)Daily Quote from the early church fathers<\/b>: <i>([\w\W]*(?=<\/i>,|,[\s]*<\/i>[\s]*by)),?(?:[\s]*<\/i>[\s]*)?,?[\s]*?by[\s]*([\w\W+]*?(?=[\s]?\(|,|<))[\w\W]*?(?=<\/p>|<br>)[\w\W]*?(?=")([\w\W]*)(?=\(excerpt)/g;
                match = re.exec(data)
                $scope.quote = {
                    title: match[3],
                    author: match[4],
                    body: match[5]
                };
                title = match[1];
                title = title.substring(1, title.length - 1);
                $scope.title = title;
                devotion = match[2].replace(/<\/?p>|<\/?i>/g, '').replace(/<\/b>[\s]*<b>/g, '').replace(/<br>/g, '') + '<b>Don Schwager</b>';
                re = /([\w\W]*?)<b>([\w\W]*?)(?=<\/b>)<\/b>/g;
                $scope.devotion = [];
                while (match = re.exec(devotion)) {
                    divider = match[2];
                    if (divider == 'Don Schwager') {
                        divider = '<p class="text-right">' + divider + '</p>';
                    } else {
                        divider = '<h2>' + divider + '</h2>';
                    }
                    $scope.devotion.push({
                        text: match[1],
                        divider: divider
                    });
                }
                $ionicLoading.hide();
            }
            function onFailure(response) {
                $ionicLoading.hide();
            }
            $http.get(url).then(onSuccess, onFailure);
        }
        
        $scope.$on('$ionicView.beforeEnter', getReflection);
    });
    
    app.controller('saints-controller', function ($scope, $state, $ionicLoading, $http, $filter, Saint) {
        
        $scope.hideBackButton = false;
        $scope.title = 'Saints of the Day';
        
        function getSaint() {
            $ionicLoading.show();
            $scope.menu = [];
            var date = $filter('date')($scope.date, 'yyyy-MM-dd');
            var url = 'http://www.catholic.org/saints/sofd.php?date=' + date;
            function onSuccess(response) {
                var content = $(response.data).find('#saintsSofd').prop('outerHTML');
                var re = /<a href="(.*)" class="list-group-item">(.*)<\/a>/g;
                var match;
                while (match = re.exec(content))
                {
                    $scope.menu.push({
                        title: match[2],
                        name: match[2],
                        url: 'http://www.catholic.org' + match[1]
                    });
                };
                $ionicLoading.hide();
            }
            function onFailure(response) {
                $ionicLoading.hide();
            }
            $http.get(url).then(onSuccess, onFailure);
        }
        
        $scope.view = function (name, url)
        {
            Saint.url = url;
            $state.go('index.saint');
        };
        
        $scope.$on('$ionicView.beforeEnter', getSaint);
    });
    
    app.controller('saint-controller', function ($scope, $state, $ionicLoading, $http, Saint) {
        
        function getSaint() {
            $ionicLoading.show();
            var url = Saint.url;
            function onSuccess (response) {
                var data, content, re, match, description, name;
                data = response.data;
                re = /<h1>(.*)<\/h1>/g
                match = re.exec(data);
                name = match[1];
                content = $(data).find('#saintContent').html();
                re = /<p>([\w\W]*)<\/p>/g
                match = re.exec(content);
                description = match[1].replace(/<\/?p>/g, '').replace(/<a.*?>(.*?)<\/a>/g, '$1');
                $scope.saint = {
                    name: name,
                    description: description
                }
                $ionicLoading.hide();
            }
            function onFailure (response) {
                $ionicLoading.hide();
            }
            $http.get(url).then(onSuccess, onFailure);
        }

        $scope.$on('$ionicView.beforeEnter', getSaint);
    });
    
    app.controller('prayers-controller', function ($scope, $state) {
        
        $scope.hideBackButton = true;
        $scope.title = 'Prayers';
        $scope.menu = [
            {
                title: 'Rosary and Chaplets',
                toState: function () {
                    $state.go('index.rosaries');
                }
            },
            {
                title: 'Liturgy of the Hours',
                toState: function () {
                    $state.go('index.divine-office');
                }
            },
            {
                title: 'Stations of the Cross',
                toState: function () {
                    $state.go('index.stations-cross');
                }
            }
        ];
    });
    
    app.controller('divine-office-controller', function ($scope, $state, $ionicLoading, $http, $filter, DivineOffice) {
        
        $scope.hideBackButton = false;
        $scope.title = 'Liturgy of the Hours';
        
        function getLiturgies () {
            $ionicLoading.show();
            $scope.menu = [];
            var date = $filter('date')($scope.date, 'yyyyMMdd');
            var url = 'http://divineoffice.org/?date=' + date;
            function onSuccess(response) {
                var data, re, match;
                data = $(response.data).find('#posts').html();
                re = /<a href="(http:\/\/divineoffice.org\/.*?) title=".*?">(.*?)<\/a>/g;
                while (match = re.exec(data)) {
                    $scope.menu.push({
                        name: match[2],
                        title: match[2],
                        url: match[1]
                    });
                };
                $ionicLoading.hide();
            }
            function onFailure(response) {
                $ionicLoading.hide();
            }
            $http.get(url).then(onSuccess, onFailure);
        }
        
        $scope.view = function (name, url) {
            DivineOffice.name = name;
            DivineOffice.url = url;
            $state.go('index.divine-office-template');
        };
        
        $scope.$on('$ionicView.beforeEnter', getLiturgies);
    });
    
    app.controller('divine-office-template-controller', function ($scope, $state, $ionicLoading, $http, $filter, DivineOffice) {
        
        function getLiturgy () {
            $ionicLoading.show();
            $scope.liturgy = {
                title: DivineOffice.name,
                text: ''
            };
            var url = DivineOffice.url;
            function onSuccess(response) {
                var data, re, match, text
                data = $(response.data).find('#posts').html();
                re = /<p>([\w\W]*?)<\/p>/g;
                while (match = re.exec(data)) {
                    text = match[1];
                    $scope.liturgy.text += text + '<br><br>';
                }
                $ionicLoading.hide();
            }
            function onFailure(response) {
                $ionicLoading.hide();
            }
            $http.get(url).then(onSuccess, onFailure);
        }
        
        $scope.$on('$ionicView.beforeEnter', getLiturgy);
    });
    
    app.controller('rosaries-controller', function ($scope, $state) {
        
        $scope.hideBackButton = false;
        $scope.title = 'Rosary and Chaplets';
        $scope.menu = [
            {
                title: 'Rosary',
                toState: function () {
                    $state.go('index.rosary');
                }
            },
            {
                title: 'Chaplet of Divine Mercy',
                toState: function () {
                    $state.go('index.chaplet-divine-mercy');
                }
            },
            {
                title: 'Chaplet of St. Michael',
                toState: function () {
                    $state.go('index.chaplet-st-michael');
                }
            },
            {
                title: 'Chaplet of St. Jude',
                toState: function () {
                    $state.go('index.chaplet-st-jude');
                }
            },
            {
                title: 'Chaplet of the Sacred Heart of Jesus',
                toState: function () {
                    $state.go('index.chaplet-sacred-heart-jesus');
                }
            }
        ];
    });
    
    app.controller('rosary-controller', function ($scope, $state) {
        
        $scope.hideBackButton = true;
        $scope.title = 'Rosary';
        $scope.menu = [
            {
                title: 'Joyful Mysteries',
                subtitle: 'Mondays and Saturdays',
                toState: function () {
                    $state.go('index.rosary-joyful');
                }
            },
            {
                title: 'Luminous Mysteries',
                subtitle: 'Thursdays',
                toState: function () {
                    $state.go('index.rosary-luminous');
                }
            },
            {
                title: 'Sorrowful Mysteries',
                subtitle: 'Tuesdays and Fridays',
                toState: function () {
                    $state.go('index.rosary-sorrowful');
                }
            },
            {
                title: 'Glorious Mysteries',
                subtitle: 'Wednesdays and Sundays',
                toState: function () {
                    $state.go('index.rosary-glorious');
                }
            }
        ];
    });
    
    app.controller('rosary-joyful-controller', function ($scope, $state, Rosary) {
        
        $scope.title = 'Joyful Mysteries';
        var mysteries = [
            {
                name: 'The Annunciation of Our Lord',
                text: 'The angel said to Mary, "You shall conceive and bear a son and give Him the name Jesus. And He will be called Son of the Most High."'
            },
            {
                name: 'The Visitation',
                text: '"Blessed are you among women and blessed is the fruit of thy womb. Blessed is she who truted that the Lord\'s words to her would be fulfilled."'
            },
            {
                name: 'The Nativity of Jesus',
                text: 'While Mary and Joseph were in Bethlehem, she gave birth to her firstborn son and wrapped Him in swadding clothes and laid Him in a manger.'
            },
            {
                name: 'The Presentation in the Temple',
                text: 'When the day come to purify them according to the law of Moses, Mary and Joseph brought Jesus up to Jerusalem so that He could be presented to the Lord.'
            },
            {
                name: 'The Finding in the Temple',
                text: 'They came upon Him in the temple sitting in the midst of the teachers, listening to them and asking them quetions. All who heard Him were amazed.'
            }
        ];
        $scope.prayers = Rosary.generateSequence(mysteries);
    });
    
    app.controller('rosary-luminous-controller', function ($scope, $state, Rosary) {
        
        $scope.title = 'Luminous Mysteries';
        var mysteries = [
            {
                name: 'The Baptism in the Jordan',
                text: 'Jesus descends into the water of the Jordan River and is baptized by John. The heavens open and the voice of the Father declares Him the beloved Son. The Spirit descends upon Jesus in the form of a dove and fills Him with God\'s mission to save humankind from sin.'
            },
            {
                name: 'The Wedding at Cana',
                text: 'Jesus changes water into wine at the request of Mary, who was first among believers. The disciples witness this miracle, their hearts open to the faith, and the begin to believe in Him.'
            },
            {
                name: 'The Proclamation of the Kingdom of God',
                text: 'Jesus preaches the Gospel in Galilee. He proclaims that this is the time of fulfillment, for the Kingdom of God is at hand. He asks all to repent and forgive the sins of those who believe in Him.'
            },
            {
                name: 'The Transfiguration',
                text: 'On Mount Tabor, the Apostles see the glory of God shining forth from the face of Jesus. The voice of the Father, coming from a cloud, says, "This is my chosen Son, listen to Him."'
            },
            {
                name: 'The Institution of the Eucharist',
                text: 'At the Last Supper, Jesus offers His body and blood, under the signs of bread and wine, and washes the feet of the Apostles. He knows that Judas has betrayed Him and His hour has come. Jesus testifies to His everlasting love for each one of us by sharing the Sacrament of the Eucharist.'
            }
        ];
        $scope.prayers = Rosary.generateSequence(mysteries);
    });
    
    app.controller('rosary-sorrowful-controller', function ($scope, $state, Rosary) {
        
        $scope.title = 'Sorrowful Mysteries';
        var mysteries = [
            {
                name: 'The Agony in the Garden',
                text: 'Jesus went with them to a place called Gethsemani. He advanced a little and fell prostrate in prayer. "My Father, if it is possible, let this cup pass me by."'
            },
            {
                name: 'The Scourging at the Pillar',
                text: 'The people said, "Let His blood be upon us and upon our children." At that, he released Barabbas to them. Jesus, however, he first had scourged.'
            },
            {
                name: 'The Crowning with Thorns',
                text: 'They stripped off His clothes and wrapped Him in a scarlet cloak. Weaving a crown out of thrones, they fixed it on His head and began to mock Him.'
            },
            {
                name: 'The Carrying of the Cross',
                text: 'Jesus was led away, and carrying the cross by Himself, went out to what is called the Place of the Skull. There they crucified Him.'
            },
            {
                name: 'The Crucifixion and Death',
                text: 'The curtain in the sanctuary was torn in two. Jesus uttered a loud cry and said, "Father, into Your hands I commend my spirit." After this, He expired.'
            }
        ];
        $scope.prayers = Rosary.generateSequence(mysteries);
    });
    
    app.controller('rosary-glorious-controller', function ($scope, $state, Rosary) {
        
        $scope.title = 'Glorious Mysteries';
        var mysteries = [
            {
                name: 'The Resurrection of Our Lord',
                text: 'The angel spoke, "Do not be frightened. I know you are looking for Jesus the crucified, but He is not here. He has been raised, exactly as promised."'
            },
            {
                name: 'The Ascension into Heaven',
                text: 'He then led them out near Bethany, and with hands upraised, blessed them. As He blessed, He left them, and was taken up to heaven.'
            },
            {
                name: 'The Descent of the Holy Spirit',
                text: 'Tounges as of fire appeared which parted and came to rest on each of them. All were filled with the Holy Spirit.'
            },
            {
                name: 'The Assumption of Mary',
                text: 'May you be blessed, my daughter, by God most high, beyond all women on earth; and may the Lord God be blessed, the Creator of heaven and earth.'
            },
            {
                name: 'The Coronation of Mary',
                text: 'A great sign appeared in the sky, a woman clothed with the sun, with the moon under her feet and on her head a crown of twelve stars.'
            }
        ];
        $scope.prayers = Rosary.generateSequence(mysteries);
    });
    
    app.controller('stations-cross-controller', function ($scope, $state) {
        
        $scope.stations = [
            {
                name: 'Opening Prayer',
                prayer: 
                    'Mary, my Mother, you were the first to live the Way of the Cross. You felt every pain and every humiliation. You were unafraid of the ridicule heaped upon you by the crowds. Your eyes were ever on Jesus and His Pain. Is that the secret of your miraculous strength? How did your loving heart bear such a burden and such a weight? As you watched Him stumble and fall, were you tortured by the memory of all the yesterdays - His birth, His hidden life and His ministry?<br><br>' +
                    'You were so desirous of everyone loving Him. What a heartache it was to see so many hate Him - hate with a diabolical fury. Take my hand as I make this Way of the Cross. Inspire me with those thoughts that will make me realize how much He loves me. Give me light to apply each station to my daily life and to remember my neighbor\'s needs in this Way of the Pain.<br><br>' +
                    'Obtain for me the grace to understand the mystery, the wisdom and the Divine love as I go from scene to scene. Grant that my heart, like yours, may be pierced through by the sight of His sorrow and the misery and that I may determine never to offend Him again. What a price He paid to cover my sins, to open the gates of heaven for me and to fill my soul with His own Spirit. Sweet Mother, let us travel this way together and grant that the love in my poor heart may give you some slight consolation.<br><br>' +
                    'Amen.'
            },
            {
                name: 'The First Station:<br>Jesus is Condemned to Death',
                prayer:
                    'My Jesus, the world still has You on trial. It keeps asking who You are and why You make the demands You make. It asks over and over the question, If You are God\'s Son, why do You permit the world to be in the state it is in? Why are You so silent?<br><br>' +
                    'Though the arrogance of the world angers me, I must admit that silently, in the depths of my soul, I too have these questions. Your humility frustrates me and makes me uncomfortable. Your strength before Pilate as You drank deeply from the power of the Father, gives me the answer to my question - The Father\'s Will. The Father permits many sufferings in my life but it is all for my good. If only I too could be silent in the face of worldly prudence - steadfast in the faith when all seems lost - calm when accused unjustly - free from tyranny of human respect - ready to do the Father\'s Will no matter how difficult.<br><br>' +
                    'Silent Jesus, give us all the graces we need to stand tall in the face of the ridicule of the world. Give the poor the strength not to succumb to their privation but to be ever aware of their dignity as sons of God. Grant that we might not bend to the crippling disease of worldly glory but be willing to be deprived of all things rather than lose Your friendship. My Jesus, though we are accused daily of being fools, let the vision of Quiet Dignity standing before Monstrous Injustice, give us all the courage to be Your followers.<br><br>' +
                    'Amen.'
            },
            {
                name: 'The Second Station:<br>Jesus Carries His Cross',
                prayer:
                    'How could any human impose such a burden upon Your torn and bleeding body, Lord Jesus? Each movement of the cross drove the thorns deeper into Your Head. How did You keep the hatred from welling up in Your Heart? How did the injustice of it all not ruffle your peace? The Father\'s Will was hard on You - Why do I complain when it is hard on me?<br><br>' +
                    'I see injustice and am frustrated and when my plans to alleviate it seems futile, I despair. When I see those burdened with poverty suffer ever more and cross is added to cross my heart is far from serene. I utterly fail to see the dignity of the cross as it is carried with love. I would so much rather be without it.<br><br>' +
                    'My worldly concept is that suffering, like food, should be shared equally. How ridiculous I am, dear Lord. Just as we do not all need the same amount of material food, neither do we need the same amount of spiritual food and that is what the cross is in my life, isn\'t it - spiritual food proportional to my needs.<br><br>' +
                    'Amen.'
            },
            {
                name: 'The Third Station:<br>Jesus Falls the First Time',
                prayer:
                    'My Jesus, it seems to me, that as God, You would have carried Your cross without faltering, but You did not. You fell beneath it\'s weight to show me You understand when I fall. Is it pride that makes me want to shine even in pain? You were not ashamed to fall- to admit the cross was heavy. There are those in world whom my pride will not tolerate as I expect everyone to be strong, yet I am weak. I am ashamed to admit failure in anything.<br><br>' +
                    'If the Father permits failure in my life just as He permitted You to fall, then I must know there is good in that failure which my mind will never comprehend. I must not concentrate on the eyes of others as they rest upon me in my falls. Rather, I must reach up to touch that invisible hand and drink in that invisible strength ever at my side.<br><br>' +
                    'Weak Jesus, help all men who try so hard to be good but whose nature is constantly opposed to them walking straight and tall down the narrow road of life. Raise their heads to see the glory that is to come rather than the misery of the present moment.<br><br>' +
                    'Your love for me gave You strength to rise from Your fall. Look upon all those whom the world considers unprofitable servants and give them the courage to be more concerned as to how they stand before You, rather than their fellowmen.<br><br>' +
                    'Amen.'
            },
            {
                name: 'The Fourth Station:<br>Jesus Meets His Afflicted Mother',
                prayer:
                    'My Jesus, it was a great sorrow to realize Your pain caused Mary so much grief. As Redeemer, You wanted her to share in Your pain for mankind. When You glanced at each other in unutterable suffering, what gave you both the courage to carry on without the least alleviation - without anger at such injustice?<br><br>' +
                    'It seems as if you desired to suffer every possible pain to give me an example of how to suffer when my time comes. What a humiliation for You when Your mother saw you in such a pitiable state - weak - helpless - at the mercy of sinful men - holiness exposed to evil in all hideousness.<br><br>' +
                    'Did every moment of that short encounter seem like an eternity? As I see so much suffering in the world, there are times I think it is all hopeless. There is an element of lethargy in my prayers for mankind that says "I\'ll pray, but what good will it do? The sick grow sicker and the hungry starve. " I think of that glance between You and Mary - the glance that said, "Let us give this misery to the Father for the salvation of souls. The Father\'s power takes our pain and frustration and renews souls, saves them for a new life - a life of eternal joy, eternal happiness. It is worth it all." Give perseverance to the sick so they can carry the cross of frustration and agony with love and resignation for the salvation of others.<br><br>' +
                    'Amen.'
            },
            {
                name: 'The Fifth Station:<br>Simon Helps Jesus Carry His Cross',
                prayer:
                    'My Jesus, Your tormentors enlisted a Simon of Cyrene to help You carry Your cross. Your humility is beyond my comprehension. Your power upheld the whole universe and yet You permit one of Your creatures to help You carry a cross. I imagine Simon was reluctant to take part in Your shame. He had no idea that all who watched and jeered at him would pass into oblivion while his name would go down in history and eternity as the one who helped his God in need. Is it not so with me, dear Jesus? Even when I reluctantly carry my cross as Simon did, it benefits my soul.<br><br>' +
                    'If I keep my eyes on You and watch how You suffered, I will be able to bear my cross with greater fortitude. Were you trying to tell all those who suffer from prejudice to have courage? Was Simon a symbol of all those who are hated because of race, color and creed?<br><br>' +
                    'Simon wondered as he took those beams upon his shoulders, why he was chosen for such a heavy burden and now he knows. Help me Jesus, to trust your loving Providence as you permit suffering to weave itself in and out of my life. Make me understand that You looked at it and held it fondly before You passed it on to me. You watch me and give me strength just as You did Simon. When I enter Your Kingdom, I shall know as he knows, what marvels Your Cross has wrought in my soul.<br><br>' +
                    'Amen.'
            },
            {
                name: 'The Sixth Station:<br>Veronica Wipes the Face of Jesus',
                prayer:
                    'My Jesus, where were all the hundreds of peoples whose bodies and souls were healed by you? Where were they when You needed someone to give You the least sign of comfort? Ingratitude must have borne down upon Your heart and made the cross nearly impossible to carry. There are times I too feel all my efforts for Your Kingdom are futile and end in nothingness. Did your eyes roam through the crowd for the comfort of just one individual - one sign of pity - one sign of grief?<br><br>' +
                    'My heart thrills with a sad joy when I think of one woman, breaking away from fear and human respect and offeringYou her thin veil to wipe Your bleeding Face. Your loving heart, ever watching for the least sign of love, imprinted the Image of your torn Face upon it! How can You forget Yourself so completely and reward such a small act of kindness?<br><br>' +
                    'I must admit, I have been among those who were afraid to know You rather than like Veronica. She did not care if the whole world knew she loved You. Heartbroken Jesus, give me that quality of the soul so necessary to witness to spread Your Word - to tell all people of Your love for them. Send many into Your Vineyard so the people of all nations may receive the Good News. Imprint Your Divine Image upon my soul and let the thin veil of my human nature bear a perfect resemblance to your loving Spirit.<br><br>' +
                    'Amen.'
            },
            {
                name: 'The Seventh Station:<br>Jesus Falls A Second Time',
                prayer:
                    'My Jesus, one of the beautiful qualities the people admired in You was Your strength in time of ridicule - Your ability to rise above the occasion. But now, You fall a second time - apparently conquered by the pain of the Cross. People who judged You by appearances made a terrible mistake. What looked like weakness was unparalleled strength!<br><br>' +
                    'I often judge by appearances and how wrong I am most of the time. The world judges entirely by this fraudulent method of discerning. It looks down upon those who apparently have given their best and are now in need. It judges the poor as failures, the sick as useless and the aged as a burden. How wrong that kind of judgment is in the light of your second fall! Your greatest moment wasYour weakest one. Your greatest triumph was in failure. Your greatest act of love was in desolation. Your greatest show of power was in that utter lack of strength that threw You to the ground.<br><br>' +
                    'Weak and powerful Jesus, give me the grace to see beyond what is visible and be more aware of Your Wisdom in the midst of weakness. Give the aged, sick, handicapped, retarded, deaf and blind the fruit of joy so they may ever be aware of the Father\'s gift and the vast difference between what the world sees and what the Father sees that they may glory in their weakness so the power of God may be manifest.<br><br>' +
                    'Amen.'
            },
            {
                name: 'The Eighth Station:<br>Jesus Speaks to the Holy Women',
                prayer:
                    'My Jesus, I am amazed at Your compassion for others in Your time of need. When I suffer, I have a tendency to think only of myself but You forgot Yourself completely. When You saw the holy women weeping over Your torments, You consoled them and taught them to look deeper into Your Passion. You wanted them to understand that the real evil to cry over was the rejection You suffered from the Chosen people - a people set apart from every other nation, who refused to accept God\'s Son.<br><br>' +
                    'The Act of Redemption would go on and no one would ever be able to take away Your dignity as Son of God, but the evil, greed, jealousy and ambition in the hearts of those who should have recognized You was the issue to grieve over. To be so close to God made man and miss Him completely was the real crime.<br><br>' +
                    'My Jesus, I fear I do the same when I strain gnats and then swallow camels - when I take out the splinter in my brother\'s eye and forget the beam in my own. It is such a gift - this gift of faith. It is such a sublime grace to possess Your own Spirit. Why haven\'t I advanced in holiness of life? I miss the many disguises you take upon Yourself and see only people, circumstances and human events, not the loving hand of the Father guiding all things. Help all those who are discouraged, sick, lonely and old to recognize Your Presence in their midst.<br><br>' +
                    'Amen.'
            },
            {
                name: 'The Ninth Station:<br>Jesus Falls the Third Time',
                prayer:
                    'My Jesus, even with the help of Simon You fell a third time. Were You telling me that there may be times in my life that I will fall again and again despite the help of friends and loved ones? There are times when the crosses You permit in my life are more than I can bear. It is as if all the sufferings of a life time are suddenly compressed into the present moment and it is more than I can stand.<br><br>' +
                    'Though it grieves my heart to see You so weak and helpless, it is a comfort to my soul to know that you understand my sufferings from Your own experience. Your love for me made You want to experience every kind of pain just so I could have someone to look to for example and courage.<br><br>' +
                    'When I cry out from the depths of my soul, "This suffering is more than I can bear," do You whisper, "Yes, I understand"? When I am discouraged after many falls, do you say in my innermost being, "Keep going, I know how hard it is to rise"?<br><br>' +
                    'There are many people who are sorely tried in body and soul with alcohol and drug weaknesses who try and try and fall again and again. Through the humiliation of this third fall, give them the courage and perseverance to take up their cross and follow you.<br><br>' +
                    'Amen.'
            },
            {
                name: 'The Tenth Station:<br>Jesus is Stripped of His Garments',
                prayer:
                    'It seems that every step to Calvary brought You fresh humiliation, my Jesus. How Your sensitive nature recoiled at being stripped before a crowd of people. You desired to leave this life as You entered it - completely detached from all the comforts of this world. You want me to know without a doubt that you loved me with an unselfish love. Your love for me caused You nothing but pain and sorrow. You gave everything and received nothing in return. Why do I find it so hard to be detached?<br><br>' +
                    'In your loving mind, dear Jesus, did You look up to the Father as You stood there on that windy hill, shivering from cold and shame and trembling from fear, and ask Him to have mercy on those who would violate their purity and make love a mockery? Did you ask forgiveness for those whose greed would make them lie, cheat and steal for a few pieces of cold silver?<br><br>' +
                    'Forgive us all, dear Jesus. Look upon the world with pity, for mankind has lost its way and the principles of this world make lust a fun game and luxury a necessity. Detachment has become merely another hardship of the poor and obedience the fault of the weak. Have mercy on us and grant the people of this day the courage to see and know themselves and the light to change.<br><br>' +
                    'Amen.'
            },
            {
                name: 'The Eleventh Station:<br>Jesus is Nailed to the Cross',
                prayer:
                    'It is hard to imagine a God being nailed to a cross by His own creatures. It is even more difficult for my mind to understand a love that permitted such a thing to happen! As those men drove heavy nails into Your hands and feet, dear Jesus, did You offer the pain as reparation for some particular human weakness and sin? Was the nail in Your right hand for those who spend their lives in dissipation and boredom?<br><br>' +
                    'Was the nail in Your left hand in reparation for all consecrated souls who live lukewarm lives? Were You stretching out Your arms to show us how much You love us? As the feet that walked the hot, dusty roads were nailed fast, did they cramp up in a deadly grip of pain to make reparation for all those who so nimbly run the broad road of sin and self-indulgence?<br><br>' +
                    'It seems, dear Jesus, Your love has held You bound hand and foot as Your heart pleads for a return of love. You seem to shout from the top of the hill "I love you - come to me - see, I am held fast - I cannot hurt you - only you can hurt Me." How very hard is the heart that can see such love and turn away. Is it not true I too have turned away when I did not accept the Father\'s Will with love? Teach me to keep my arms ever open to love, to forgive and to render service - willing to be hurt rather than hurt, satisfied to love and not be loved in return.<br><br>' +
                    'Amen.'
            },
            {
                name: 'The Twelfth Station:<br>Jesus Dies on the Cross',
                prayer:
                    'God is dead! No wonder the earth quaked, the sun hid itself, the dead rose and Mary stood by in horror. Your human body gave up it\'s soul in death but Your Divinity, dear Jesus, continued to manifest its power. All creation rebelled as the Word made Flesh departed from this world. Man alone was too proud to see and too stubborn to acknowledge truth.<br><br>' +
                    'Redemption was accomplished! Man would never have an excuse to forget how much You loved him. The thief on Your right saw something he could not explain - he saw a man on a tree and knew He was God. His need made him see his own guilt and Your innocence. The Promise of eternal life made the remaining hours of his torture. endurable.<br><br>' +
                    'A common thief responded to Your love with deep Faith, Hope, and Love. He saw more than his eyes envisioned - he felt a Presence he could not explain and would not argue with. He was in need and accepted the way God designed to help him.<br><br>' +
                    'Forgive our pride, dear Jesus as we spend hours speculating, days arguing and often a lifetime in rejecting Your death, which is a sublime mystery. Have pity on those whose intelligence leads them to pride because they never feel the need to reach out to the Man of Sorrows for consolation.<br><br>' +
                    'Amen.'
            },
            {
                name: 'The Thirteenth Station:<br>Jesus is Taken Down From the Cross',
                prayer:
                    'My Jesus, it was with deep grief that Mary finally took You into her arms and saw all the wounds sin had inflicted upon You. Mary Magdalene looked upon Your dead Body with horror. Nicodemus, the man so full of human respect, who came to You by night, suddenly received the courage to help Joseph take you down from the Cross. You are once more surrounded by only a few followers. When loneliness and failure cross my path, let me think of this lonely moment and this total failure - failure in the eyes of men. How wrong they were - how mistaken their concept of success! The greatest act of love was given in desolation and the most successful mission accomplished and finished when all seemed lost. Is this not true in my life, dear Jesus? I judge my failures harshly. I demand perfection instead of holiness. My idea of success is for all to end well - according to my liking.<br><Br>' +
                    'Give to all men the grace to see that doing Your Will is more important than success. If failure is permitted for my greater good then teach me how to use it to my advantage. Let me say as You once said, that to do the Will of the Father is my food. Let not the standards of this world take possession of me or destroy the good You have set for me - to be Holy and to accomplish the Father\'s Will with great love. Let me accept praise or blame, success or failure with equal serenity.<br><br>' +
                    'Amen.'
            },
            {
                name: 'The Fourteenth Station:<br>Jesus is Laid in the Sepulcher',
                prayer:
                    'My Jesus, You were laid to rest in a stranger\'s tomb. You were born with nothing of this world\'s goods and You died detached from everything. When You came into the world, men slept and angels sang and now as You leave it, Creation is silent and only a few weep. Both events were clothed in obscurity. The majority of men live in such a way. Most of us live and die knowing and known by only a few. Were You trying to tell us, dear Jesus, how very important our lives are just because we are accomplishing the Father\'s Will? Will we ever learn the lesson of humility that makes us content with who we are, where we are and what we are?<br><br>' +
                    'Will our Faith ever be strong enough to see power in weakness and good in the sufferings of our lives? Will our Hope be trusting enough to rely on Your Providence even when we have nowhere to lay our head? Will our Love ever be strong enough not to take scandal in the cross?<br><br>' +
                    'My Jesus, hide my soul in Your heart as You lie in the Sepulcher alone. Let my heart be as a fire to keep you warm. Let my desire to know and love You be like a torch to light up the darkness. Let my soul sing softly a hymn of repentant love as the hours pass and Your Resurrection is at hand. Let me rejoice, dear Jesus, with all the Angels in a hymn of praise and thanksgiving for so great a love- so great a God- so great a day!<br><br>' +
                    'Amen.'
            },
            {
                name: 'Closing Prayer',
                prayer:
                    'My Jesus, I have traveled Your Way of the cross. It seems so real and I feel so ashamed. I complain of my sufferings and find obedience to the Father\'s Will difficult. My Mind bogged down by the poverty, sickness, starvation, greed and hatred in the world.<br><br>' +
                    'There are many innocent people who suffer so unjustly. There are those born with physical and mental defects. Do we understand that You continue to carry Your cross in the minds and bodies of each human being?<br><br>' +
                    'Help me to see the Father\'s Will in every incident of my daily life. This is what You did - you saw the Father\'s Will in Your persecutors, Your enemies and your pain.<br><br>' +
                    'You saw a beauty in the Cross and embraced it as a desired treasure. My worldly mind is dulled by injustice and suffering and I lose sight of the glory that is to come. Help me to trust the Father and to realize that there is something great behind the most insignificant suffering. There is Someone lifting my cross to fit my shoulders - there is Divine Wisdom in all the petty annoyances that irk my soul every day.<br><br>' +
                    'Teach me the lessons contained in my Cross, the wisdom of its necessity, the beauty of its variety and the fortitude that accompanies even the smallest cross. Mary, My Mother, obtain for me the grace to be Jesus to my neighbor and to see my neighbor in Jesus.<br><br>' +
                    'Amen.'
            }
        ];
    });
    
    app.controller('confession-controller', function ($scope, $state) {
        
        $scope.hideBackButton = true;
        $scope.title = 'Confession';
        $scope.menu = [
            {
                title: 'Examinations of Conscience',
                toState: function () {
                    $state.go('index.conscience-exam');
                }
            },
            {
                title: 'Act of Contrition',
                toState: function () {
                    $state.go('index.contrition');
                }
            }
        ];
    });
    
    app.controller('contrition-controller', function ($scope, $state, Prayers) {
        
        $scope.prayer = Prayers.contrition;
    });
    
    app.controller('conscience-exam-controller', function ($scope, $state) {
        
        $scope.hideBackButton = false;
        $scope.title = "Examination of Conscience";
        $scope.menu = [
            {
                title: 'Ten Commandments',
                toState: function () {
                    $state.go('index.conscience-commandments');
                }
            },
            {
                title: 'Catholic Social Teaching',
                toState: function () {
                    $state.go('index.conscience-social-teaching');
                }
            },
            {
                title: 'For Children',
                toState: function () {
                    $state.go('index.conscience-children');
                }
            },
            {
                title: 'For Young Adult',
                toState: function () {
                    $state.go('index.conscience-young-adult');
                }
            },
            {
                title: 'For Single People',
                toState: function () {
                    $state.go('index.conscience-single');
                }
            },
            {
                title: 'For Married People',
                toState: function () {
                    $state.go('index.conscience-married');
                }
            },
        ];
    });
    
    app.controller('conscience-commandments-controller', function ($scope, $state) {
        
        $scope.sections = [
            {
                name: 'First Commandment:<br>I am the Lord your God: you shall not have strange Gods before me',
                questions: [
                    'Have I treated people, events, or things as more important than God?'
                ]
            },
            {
                name: 'Second Commandment:<br>You shall not take the name of the Lord your God in vain',
                questions: [
                    'Have my words, actively or passively, put down God, the Church, or people?'
                ]
            },
            {
                name: 'Third Commandment:<br>Remember to keep holy the Lord’s Day',
                questions: [
                    'Do I go to Mass every Sunday (or Saturday Vigil) and on Holy Days of Obligation?',
                    'Do I avoid, when possible, work that impedes worship to God, joy for the Lord’s Day, and proper relaxation of mind and body?',
                    'Do I look for ways to spend time with family or in service on Sunday?'
                ]
            },
            {
                name: 'Fourth Commandment:<br>Honor your Father and Mother',
                questions: [
                    'Do I show my parents due respect?',
                    'Do I seek to maintain good communication with my parents where possible?',
                    'Do I criticize them for lacking skills I think they should have?'
                ]
            },
            {
                name: 'Fifth Commandment:<br>You shall not kill',
                questions: [
                    'Have I harmed another through physical, verbal, or emotional means, including gossip or manipulation of any kind?'
                ]
            },
            {
                name: 'Sixth Commandment:<br>You shall not commit adultery',
                questions: [
                    'Have I respected the physical and sexual dignity of others and of myself?'
                ]
            },
            {
                name: 'Seventh Commandment:<br>You shall not steal',
                questions: [
                    'Have I taken or wasted time or resources that belonged to another?'
                ]
            },
            {
                name: 'Eighth Commandment:<br>You shall not bear false witness against your neighbor',
                questions: [
                    'Have I gossiped, told lies, or embellished stories at the expense of another?'
                ]
            },
            {
                name: 'Ninth Commandment:<br>You shall not covet your neighbor’s spouse',
                questions: [
                    'Have I honored my spouse with my full affection and exclusive love?'
                ]
            },
            {
                name: 'Tenth Commandment:<br>You shall not covet your neighbor’s goods',
                questions: [
                    'Am I content with my own means and needs, or do I compare myself to others unnecessarily?'
                ]
            },
            {
                name: 'Christ\'s Two Commandments:<br>1. You shall love the Lord, your God, with all your heart, with all your soul, and with all your mind<br>2. You shall love your neighbor as yourself',
                questions: [
                    'How well do we love God and others? Do we love as Christ calls us to?'
                ]
            }
        ];
    });
    
    app.controller('conscience-ewtn-controller', function ($scope, $state) {
        
        $scope.sections = [
            {
                name: 'First Commandment:<br>I am the Lord, thy God, thou shalt not have strange gods before Me',
                questions: [
                    'Have I sinned against Religion by seriously believing in New Age, Scientology, Astrology, Horoscopes, Fortune-telling, Superstition or engaging in the Occult?',
                    'Did I endanger my Catholic Faith or cause scandal by associating with anti-Catholic groups & associations?',
                    'Have fame, fortune, money, career, pleasure, etc. replaced God as my highest priority?',
                    'Have I neglected my daily prayers?'
                ]
            },
            {
                name: 'Second Commandment:<br>Thou shalt not take the name of the Lord thy God in vain',
                questions: [
                    'Have I committed blasphemy by using the name of God and Jesus Christ to swear rather than to praise?',
                    'Have I committed sacrilege by showing disrespect to holy objects (crucifix, rosary) or contempt for religious persons (bishop, priests, deacons, women religious) or for sacred places?',
                    'Have I committed sacrilege by going to Holy Communion in the state of mortal sin without first going to confession e.g., after missing Mass on Sunday or a Holyday?',
                    'Did I violate the one-hour fast before Communion?',
                    'Did I break the laws of fast and abstinence during Lent?', 
                    'Did I neglect my Easter duty to receive Holy Communion at least once?',
                    'Have I neglected to support the Church and the poor by sharing my time, talent and treasure?'
                ]
            },
            {
                name: 'Third Commandment:<br>Remember to keep holy the Sabbath day',
                questions: [
                    'Did I miss Mass on any Sunday or Holyday of Obligation?',
                    'Have I shown disrespect by leaving Mass early, not paying attention or not joining in the prayers?',
                    'Did I do unnecessary work on Sunday which could have been done the day before?',
                    'Have I been stingy in my support for the Church?',
                    'Do I give of my time & talent?'
                ]
            },
            {
                name: 'Fourth Commandment:<br>Honor thy Father and Mother',
                questions: [
                    'Have I set a bad example for my children by casually missing Mass, neglecting prayer, or ignore my responsibility to provide a Catholic education by either sending my children to parochial school or to C.C.D. (Religious Education Program)?',
                    'Do I show little or no interest in my children’s faith and practice of it?',
                    'Have I showed disrespect for those in authority, government or church?',
                    'Have I not expressed my moral values to them?',
                    'Have I been disobedient and/or disrespectful to my parents or guardians?',
                    'Did I neglect to help them with household chores?',
                    'Have I caused them unnecessary worry and anxiety by my attitude, behavior, moods, etc.?'
                ]
            },
            {
                name: 'Fifth Commandment:<br>Thou shalt not kill',
                questions: [
                    'Did I consent, recommend, advise, approve, support or have an abortion?',
                    'Did I realize that there is an excommunication for anyone who procures an abortion?',
                    'Did I actively or passively cooperate with an act of euthanasia whereby ordinary means were stopped or means taken to directly end the life of an elderly or sick person?',
                    'Have I committed an act of violence or abuse (physical, sexual, emotional or verbal)?',
                    'Have I endangered the lives of others by reckless driving or by driving under the influence of drugs or alcohol?',
                    'Do I show contempt for my body by neglecting to take care of my own health?',
                    'Have I been mean or unjust to anyone?',
                    'Have I held a grudge or sought revenge against someone who wronged me?',
                    'Do I point out others’ faults and mistakes while ignoring my own?',
                    'Do I complain more than I compliment?',
                    'Am I ungrateful for what other people do for me?',
                    'Do I tear people down rather than encourage them?',
                    'Am I prejudiced against people because of their color, language or ethnic-religious background?'
                ]
            },
            {
                name: 'Sixth Commandment:<br>Thou shalt not commit adultery',
                questions: [
                    ''
                ]
            },
            {
                name: 'Seventh Commandment:<br>Thou shalt not steal',
                questions: [
                    ''
                ]
            },
            {
                name: 'Eighth Commandment:<br>Thou shalt not bear false witness against thy neighbor',
                questions: [
                    'Have I told a lie in order to deceive someone?',
                    'Have I told the truth with the purpose and intention of ruining someone’s reputation (sin of detraction)?',
                    'Have I told a lie or spread rumors which may ruin someone’s reputation (sin of calumny or slander)?',
                    'Did I commit perjury by false swearing an oath on the Bible?',
                    'Am I a busybody or do I love to spread gossip and secrets about others?',
                    'Do I love to hear bad news about my enemies?'
                ]
            },
            {
                name: 'Ninth Commandment:<br>Thou shalt not covet thy neighbor’s wife',
                questions: [
                    'Did I have any sex before or outside of marriage?',
                    'Do I view pornographic material (magazines, videos, internet, hot-lines)?',
                    'Have I gone to massage parlors or adult book stores?',
                    'Did I commit the sins of masturbation and/or artificial contraception?',
                    'Have I not avoided the occasions of sin (persons or places) which would tempt me to be unfaithful to my spouse or to my own chastity?',
                    'Do I encourage and entertain impure thoughts and desires?',
                    'Do I tell or listen to dirty jokes?',
                    'Have I committed fornication or adultery?'
                ]
            },
            {
                name: 'Tenth Commandment:<br>Thou shalt not covet thy neighbor’s goods',
                questions: [
                    'Have I stolen any object, committed any shoplifting or cheated anyone of their money?',
                    'Did I knowingly deceive someone in business or commit fraud?',
                    'Have I shown disrespect or even contempt for other people’s property?',
                    'Have I done any acts of vandalism?',
                    'Am I greedy or envious of another’s goods?',
                    'Do I let financial and material concerns or the desire for comfort override my duty to God, to Church, to my family or my own spiritual well-being?'
                ]
            }
        ];
    });
    
    app.controller('conscience-social-teaching-controller', function ($scope, $state) {
        
        $scope.sections = [
            {
                name: 'Life and Dignity of the Human Person',
                questions: [
                    'Do I respect the life and dignity of every human person from conception through natural death?',
                    'Do I recognize the face of Christ reflected in all others around me whatever their race, class, age, or abilities?',
                    'Do I work to protect the dignity of others when it is being threatened?',
                    'Am I committed to both protecting human life andto ensuring that every human being is able to live in dignity?'
                ]
            },
            {
                name: 'Call to Family, Community, and Participation',
                questions: [
                    'Do I try to make positive contributions in my family and in my community?',
                    'Are my beliefs, attitudes, and choices such that they strengthen or undermine the institution of the family?',
                    'Am I aware of problems facing my local community and involved in efforts to find solutions? Do I stay informed and make my voice heard when needed?',
                    'Do I support the efforts of poor persons to work for change in their neighborhoods and communities? Do my attitudes and interactions empower or disempower others?'
                ]
            },
            {
                name: 'Rights and Responsibilities',
                questions: [
                    'Do I recognize and respect the economic, social, political, and cultural rights of others?',
                    'Do I live in material comfort and excess while remaining insensitive to the needs of others whose rights are unfulfilled?',
                    'Do I take seriously my responsibility to ensure that the rights of persons in need are realized?',
                    'Do I urge those in power to implement programs and policies that give priority to the human dignity and rights of all, especially the vulnerable?'
                ]
            },
            {
                name: 'Option for the Poor and Vulnerable',
                questions: [
                    'Do I give special attention to the needs of the poor and vulnerable in my community and in the world?',
                    'Am I disproportionately concerned for my own good at the expense of others?',
                    'Do I engage in service and advocacy work that protects the dignity of poor and vulnerable persons?'
                ]
            },
            {
                name: 'The Dignity of Work and the Rights of Workers',
                questions: [
                    'As a worker, do I give my employer a fair day’s work for my wages? As an owner, do I treat workers fairly?',
                    'Do I treat all workers with whom I interact with respect, no matter their position or class?',
                    'Do I support the rights of all workers to adequate wages, health insurance, vacation and sick leave? Do I affirm their right to form or join unions or worker associations?',
                    'Do my purchasing choices take into account the hands involved in the production of what I buy? When possible, do I buy products produced by workers whose rights and dignity were respected?'
                ]
            },
            {
                name: 'Solidarity',
                questions: [
                    'Does the way I spend my time reflect a genuine concern for others?',
                    'Is solidarity incorporated into my prayer and spirituality? Do I lift up vulnerable people throughout the world in my prayer, or is it reserved for only my personal concerns?',
                    'Am I attentive only to my local neighbors or also those across the globe?',
                    'Do I see all members of the human family as my brothers and sisters?'
                ]
            },
            {
                name: 'Care for God\' Creation',
                questions: [
                    'Do I live out my responsibility to care for God’s creation?',
                    'Do I see my care for creation as connected to my concern for poor persons, who are most at risk from environmental problems?',
                    'Do I litter? Live wastefully?  Use energy too freely? Are there ways I could reduce consumption in my life?',
                    'Are there ways I could change my daily practices and those of my family, school, workplace, or community to better conserve the earth’s resources for future generations?'
                ]
            }
        ];
    });
    
    app.controller('conscience-children-controller', function ($scope, $state) {
        
        $scope.sections = [
            {
                name: 'Responsibilities to God',
                questions: [
                    'Have I prayed every day?',
                    'Have I prayed my morning prayers and night prayers?',
                    'Have I prayed with my parents and family?',
                    'Have I been moody and rebellious about praying and going to church on Sunday?',
                    'Have I asked the Holy Spirit to help me whenever I have been tempted to sin?',
                    'Have I asked the Holy Spirit to help me do what is right?'
                ]
            },
            {
                name: 'Responsibilities to Others',
                questions: [
                    'Have I been obedient and respectful to my parents?',
                    'Have I lied or been deceitful to them or to others?',
                    'Have I been arrogant, stubborn or rebellious?',
                    'Have I talked back to parents, teachers or other adults?',
                    'Have I pouted and been moody?',
                    'Have I been selfish toward my parents, brothers, and sisters,',
                    'teachers, or my friends and schoolmates?',
                    'Have I gotten angry at them? Have I hit anyone?',
                    'Have I held grudges or not forgiven others?',
                    'Have I treated other children with respect or have I made fun of them and called them names?',
                    'Have I used bad language?',
                    'Have I stolen anything? Have I returned it?',
                    'Have I performed my responsibilities, such as homework and household chores?',
                    'Have I been helpful and affectionate toward my family?',
                    'HaveI been kind and generous with my friends?'
                ]
            }
        ];
    });
    
    app.controller('conscience-young-adult-controller', function ($scope, $state) {
        
        $scope.sections = [
            {
                name: 'Responsibilities to God',
                questions: [
                    'Have I gone to Mass on Sunday or have I rebelled and been stubborn about going to Mass?',
                    'Did I participate in the Mass or did I daydream?',
                    'Have I prayed every day?',
                    'Have I read the Bible?',
                    'Have I been rebellious toward God and his commands?',
                    'Have I misused the name of God by swearing and cursing?',
                    'Have I told the Father that I love him for creating me and making me his son/daughter?',
                    'Have I thanked Jesus for becoming man, dying for my sin and rising to give me eternal life?',
                    'Have I asked the Holy Spirit to help me conquer sin and temptation and to be obedient to God’s commands?'
                ]
            },
            {
                name: 'Responsibilities to Others and Myself',
                questions: [
                    'Have I been rebellious, disobedient or disrespectful to my parents, teachers and those in authority over me?',
                    'Have I lied to or deceived my parents or others?',
                    'Have I been arrogant and stubborn?',
                    'Have I talked back to my parents or those in authority?',
                    'Have I gotten angry or nurtured and held grudges and resentments? Have I refused to forgive others? Have I cultivated hatred?',
                    'Have I engaged in sexual fantasies? Have I looked at others lustfully?',
                    'Have I read pornographic literature or looked at pornographic pictures, shows or movies?',
                    'Have I masturbated?',
                    'Have I lustfully kissed or sexually touched someone? Have I had sexual intercourse?',
                    'Have I had an abortion or encouraged another to have one?',
                    'Have I gossiped about others? Have I slandered anyone? Have I told lies about others? Have I mocked or made fun of others?',
                    'Have I lied or cheated? Have I stolen anything? Have I paid it back?',
                    'Have I been selfish or spiteful toward others? Have I been jealous?',
                    'Have I gotten drunk, or taken drugs?',
                    'Have I participated in anything that is of the occult: ouija boards, fortune tellers, séances, channeling, astrology?',
                    'Have I been patient, kind gentle and self-controlled?',
                    'When my conscience told me to do something good, did I do it or did I ignore it?'
                ]
            }
        ];
    });
    
    app.controller('conscience-single-controller', function ($scope, $state) {
        
        $scope.sections = [
            {
                name: 'Responsibilities to God',
                questions: [
                    'Have I gone to Mass every Sunday? Have I participated at Mass or have I daydreamed or been present with a blank mind?',
                    'Have I prayed every day (15-20 minutes)?',
                    'Have I read the Bible? Have I studied the truths of our faith and allowed them to become more a part of the way I think and act? Have I read any spiritual books or religious literature?',
                    'Have I told God that I want to love him with my whole heart, mind and strength? Do I hold any resentments toward God?',
                    'Have I recognized my need for Jesus and his salvation? Have I asked the Holy Spirit to empower me to live the Christian life?',
                    'Have I been financially generous to the Church? Have I participated in parish or religious activities?',
                    'Have I held resentments toward the Church or Church authorities? Have I forgiven them?'
                ]
            },
            {
                name: 'Responsibilities to Others and Myself',
                questions: [
                    'Have I been rebellious, disobedient or disrespectful to anyone in authority?',
                    'Have I lied to or deceived others—friends, boss, or coworkers?',
                    'Have I been arrogant and stubborn?',
                    'Have I gotten angry or nurtured and held grudges and resentments?',
                    'Have I refused to forgive others—parents,relatives, employers, former friend, a former spouse? Have I cultivated hatred?',
                    'Have I felt sorry for myself or nurtured self-pity?',
                    'Have I engaged in sexual fantasies? Have I looked at others lustfully?',
                    'Have I read pornographic literature or looked at pornographic pictures, shows or movies?',
                    'Have I masturbated?',
                    'Have I lustfully kissed or sexually touched someone? Have I had sexual intercourse?',
                    'Have I had an abortion or encouraged another to have one?',
                    'Have I gossiped about others? Have I slandered anyone? HaveI told lies about others? Have I mocked or made fun of others?'
                ]
            },
            {
                name: 'Responsibilities to Society',
                questions: [
                    'Have I been a Christian witness to those with whom I work or associate? Have I spoken to anyone about the Gospel and how important it is to believe in Jesus?',
                    'Have I allowed the Gospel to influence my political and social opinions?',
                    'Have I had a proper Christian concern for the poor and needy?',
                    'Have I paid my taxes?',
                    'Have I fostered or nurtured hatred toward my ‘political’ opponents, either local, national or international?',
                    'Have I been prejudiced toward others because of race, color, religion or social status?'
                ]
            }
        ];
    });
    
    app.controller('conscience-married-controller', function ($scope, $state) {
        
        $scope.sections = [
            {
                name: 'Responsibilities to God',
                questions: [
                    'Have I gone to Mass every Sunday? Have I participated at Mass or have I daydreamed or been present with a blank mind?',
                    'Have I prayed every day (15-20 minutes)?',
                    'Have I read the Bible? Have I studied the truths of our faith and allowed them to become more a part of the way I think and act? Have I read any spiritual books or religious literature?',
                    'Have I told God that I want to love him with my whole heart, mind and strength? Do I hold any resentments toward God?',
                    'Have I recognized my need for Jesus and his salvation? Have I asked the Holy Spirit to empower me to live the Christian life?',
                    'Have I been financially generous to the Church? Have I participated in parish or religious activities?',
                    'Have I held resentments toward the Church or Church authorities? Have I forgiven them?'
                ]
            },
            {
                name: 'Responsibilities to My Spouse',
                questions: [
                    'Have I cared for my spouse? Have I been generous with my time? Have I been affectionate and loving? Have I told my spouse that I love him or her?',
                    'Have I been concerned about the spiritual well-being of my spouse?',
                    'Have I listened to my spouse? Have I paid attention to his orher concerns, worries, and problems? Have I sought these out?',
                    'Have I allowed resentments and bitterness toward my spouse to take root in my mind? Have I nurtured these? Have I forgiven my spouse for the wrongs he or she has committed against me?',
                    'Have I allowed misunderstanding, miscommunication or accidents to cause anger and mistrust? Have I nurtured criticaland negative thoughts about my spouse?',
                    'Have I manipulated my spouse in order to get my own way?',
                    'Have I tried to bully or overpower my spouse?',
                    'Have I spoken sharply or sarcastically to my spouse? Have I spoken in a demeaning or negative way? Have I injured my spouse through taunting and negative teasing? Have I called my     spouse harsh names or used language that is not respectful?',
                    'Have I physically abused my spouse?',
                    'Have I gossiped about my spouse?',
                    'Have I undermined the authority and dignity of my spouse through disrespect and rebelliousness?',
                    'Have I been moody and sullen?',
                    'Have I bickered with my spouse out of stubbornness and selfishness?',
                    'Have I lied or been deceitful to my spouse?',
                    'Have I misused sexuality? Have I used sexual relations solely for my own selfish pleasure? Have I been too demanding in my desire for sexual fulfillment? Have I been loving and    physically affectionate in my sexual relations or have I used sexual relations in a way that would be demeaning or disrespectful to my spouse? Have I refused sexual relations out of laziness, revenge or manipulation?',
                    'Have I refused to conceive children out of selfishness or material greed? Have I used artificial means of contraception?',
                    'Have I had an abortion or encouraged others to have one?',
                    'Have I masturbated?',
                    'Have I flirted or fostered improper relationships with someone else, either in my mind or through words and actions?',
                    'Have I used pornography: books, magazines or movies?',
                    'Have I committed adultery?',
                    'Have I misused alcohol or drugs?',
                    'Have I been financially responsible?'
                ]
            },
            {
                name: 'Responsibilities to Children',
                questions: [
                    'Have I cared for the spiritual needs of my children? Have I been a shepherd and guardian as god has appointed me? Have I tried to foster a Christian family where Jesus is Lord? Have I taught my children the Gospel and the commandments of God?',
                    'Have I prayed with them?',
                    'Have I been persistent and courageous in my training and teaching? Have I disciplined them when necessary? Have I been lazy and apathetic?',
                    'Have I talked with them to find out their problems, concerns and fears? Have I been affectionate toward them? Have I hugged them and told them that I love them? Have I played or recreated with them?',
                    'Have I been impatient and frustrated with them? Have I corrected them out of love in order to teach them what is right and good? Have I treated them with respect? Have I spoken to them in a sarcastic or demeaning way?',
                    'Have I held resentments against them? Have I forgiven them?',
                    'Have I been of one heart and mind with my spouse in the upbringing of the children? Or have I allowed disagreements and dissension to disrupt the training, educating and disciplining  of our children?',
                    'Have I undermined the role of authority in the eyes of my children by speaking negatively against God, the Church, my spouse or others who hold legitimate authority over them?',
                    'Have I been a good Christian witness to my children in what I say and do? Or do I demand one standard for them and another for myself?',
                    'Have I been properly generous with my children regarding money and physical and material well-being? Have I been miserly? Have I been extravagant, thus spoiling them?'
                ]
            },
            {
                name: 'Responsibilities to Society',
                questions: [
                    'Have I been a Christian witness to those with whom I work or associate? Have I spoken to anyone about the Gospel and how important it is to believe in Jesus?',
                    'Have I allowed the Gospel to influence my political and social opinions?',
                    'Have I had a proper Christian concern for the poor and needy?',
                    'Have I paid my taxes?',
                    'Have I fostered or nurtured hatred toward my ‘political’ opponents, either local, national or international?',
                    'Have I been prejudiced toward others because of race, color, religion or social status?'
                ]
            }
        ];
    });
    
    app.controller('settings-controller', function ($scope, $state) {
        
        
    });
        
    app.service('Saint', function () {
        this.url = '';
    });
    
    app.service('DivineOffice', function () {
        this.name = '';
        this.url = '';
    });
    
    app.factory('Rosary', function (Prayers) {
        
        var concludingPrayer = {
            name: 'Concluding Prayer',
            text: 
                'V. Pray for us, O holy Mother of God.<br>' +
                'R. That we may be made worthy of the promises of Christ.<br><br>' +
                'O God, Whose Only-Begotten Son,<br>' +
                'by His life, death and resurrection,<br>' +
                'has purchased for us the rewards of eternal life:<br>' +
                'grant, we beseech Thee,<br>' +
                'that by meditating upon these mysteries of the most holy Rosary of the Blessed Virgin Mary,<br>' +
                'we may imitate what they contain,<br>' +
                'and obtain what they promise,<br>' +
                'through the same Christ our Lord.<br>' +
                'Amen.<br><br>' +
                'Most Sacred Heart of Jesus, have mercy on us.<br>' +
                'Immaculate Heart of Mary, pray for us.'
        };
        
        return {
            generateSequence: function (mysteries) {
                var m, hm;
                var sequence = [];
                sequence.push(Prayers.cross);
                sequence.push(Prayers.apostlesCreed);
                sequence.push(Prayers.ourFather);
                for (hm = 0; hm < 3; hm++) {
                    sequence.push(Prayers.hailMary);
                }
                sequence.push(Prayers.gloryBe);
                for (m = 0; m < mysteries.length; m++) {
                    sequence.push(mysteries[m]);
                    sequence.push(Prayers.ourFather);
                    for (hm = 0; hm < 10; hm++) {
                        sequence.push(Prayers.hailMary);
                    }
                    sequence.push(Prayers.gloryBe);
                    sequence.push(Prayers.fatima);
                }
                sequence.push(Prayers.hailHolyQueen);
                sequence.push(concludingPrayer);
                return sequence;
            }
        };
    });
    
    app.constant('Prayers', {
        
        cross: {
            name: 'Sign of the Cross',
            text: 'In the name of the Father, and of the Son, and of the Holy Spirit.<br>Amen.'
        },
        apostlesCreed: {
            name: 'Apostle\' Creed',
            text: 
                'I believe in God, the Father almighty,<br>' + 
                'creator of Heaven and earth;<br>' +
                'and in Jesus Christ, His only Son Our Lord,<br>' +
                'Who was conceived by the Holy Spirit,<br>' +
                'born of the Virgin Mary,<br>' +
                'suffered under Pontius Pilate,<br>' +
                'was crucified, died, and was buried.<br>' +
                'He descended into Hell;<br>' +
                'the third day He rose again from the dead;<br>' +
                'He ascended into Heaven,<br>' +   
                'and sitteth at the right hand of God, the Father almighty;<br>' +
                'From thence He shall come to judge the living and the dead.<br>' +
                'I believe in the Holy Spirit,<br>' +
                'the holy Catholic Church,<br>' +
                'the communion of saints,<br>' +
                'the forgiveness of sins,<br>' +
                'the resurrection of the body and life everlasting.<br>Amen.'
        },
        niceneCreed: {
            name: 'Nicene Creed',
            text:
                'I believe in God, the Father almighty,<br>' +
                'maker of heaven and earth;<br>' +
                'of all things visible and invisible<br>' +
                'I believe in one Lord Jesus Christ,<br>' +
                'the Only Begotten Son of God,<br>' +
                'born of the Father before all ages.<br>' +
                'God from God, Light from Light,<br>' +
                'true God from true God,<br>' +
                'begotten, not made,<br>' +
                'consubstantial with the Father;<br>' +
                'through him all things were made.<br>' +
                'For us men and for our salvation<br>' +
                'he came down from heaven,<br>' +
                'and by the Holy Spirit<br>' +
                'was incarnate of the Virgin Mary,<br>' +
                'and became man.<br>' +
                'For our sake he was crucified under Pontius Pilate,<br>' +
                'he suffered death and was buried,<br>' +
                'and rose again on the third day<br>' +
                'in accordance with the Scriptures.<br>' +
                'He ascended into heaven<br>' +
                'and is seated at the right hand of the Father.<br>' +
                'He will come again in glory<br>' +
                'to judge the living and the dead<br>' +
                'and his kingdom will have no end.<br>' +
                'I believe in the Holy Spirit,<br>' +
                'the Lord, the giver of life,<br>' +
                'who proceeds from the Father and the Son,<br>' +
                'who with the Father and the Son<br>' +
                'is adored and glorified,<br>' +
                'who has spoken through the prophets.<br>' +
                'I believe in one, holy, catholic and apostolic Church.<br>' +
                'I confess one Baptism for the forgiveness of sins<br>' +
                'and I look forward to the resurrection of the dead<br>' +
                'and the life of the world to come.<br>Amen.'
        },
        ourFather: {
            name: 'Our Father',
            text: 
                'Our Father, Who art in heaven,<br>' +
                'Hallowed be Thy Name.<br>' +
                'Thy Kingdom come.<br>' +
                'Thy Will be done, on earth as it is in Heaven.<br>' +
                'Give us this day our daily bread.<br>' +
                'And forgive us our trespasses,<br>' +
                'as we forgive those who trespass against us.<br>' +
                'And lead us not into temptation,<br>' +
                'but deliver us from evil.<br>Amen.'
        },
        hailMary: {
            name: 'Hail Mary',
            text:
                'Hail Mary,<br>' +
                'Full of Grace,<br>' +
                'The Lord is with thee.<br>' +
                'Blessed art thou among women,<br>' +
                'and blessed is the fruit<br>' +
                'of thy womb, Jesus.<br>' +
                'Holy Mary,<br>' +
                'Mother of God,<br>' +
                'pray for us sinners now,<br>' +
                'and at the hour of death.<br>Amen.'
        },
        gloryBe: {
            name: 'Glory Be',
            text: 
                'Glory be to the Father,<br>' +
                'and to the Son,<br>' +
                'and to the Holy Spirit.<br>' +
                'As it was in the beginning,<br>' +
                'is now,<br>' +
                'and ever shall be,<br>' +
                'world without end.<br>Amen.'
        },
        fatima: {
            name: 'Fátima Prayer',
            text:
                'O my Jesus,<br>' +
                'forgive us our sins,<br>' +
                'save us from the fires of hell,<br>' +
                'lead all souls to heaven,<br>' +
                'especially those who are in most need of Thy mercy.<br>Amen.'
        },
        hailHolyQueen: {
            name: 'Hail, Holy Queen',
            text:
                'Hail, holy Queen, Mother of mercy,<br>' +
                'our life, our sweetness and our hope.<br>' +
                'To thee do we cry, poor banished children of Eve.<br>' +
                'To thee to we send up our sighs,<br>' +
                'mourning and weeping in this valley of tears.<br>' +
                'Turn, then, most gracious advocate,<br>' +
                'thine eyes of mercy toward us,<br>' +
                'and after this, our exile,<br>' +
                'show unto us the blessed fruit of thy womb, Jesus.<br>' +
                'O clement, O loving, O sweet Virgin Mary.<br>Amen.'
        },
        contrition: {
            name: 'Act of Contrition',
            text: 
                'O my God,<br>' +
                'I am heartily sorry for having offended Thee,<br>' +
                'and I detest all my sins,<br>' +
                'because I dread the loss of heaven,<br>' +
                'and the pains of hell;<br>' +
                'but most of all because they offend Thee, my God,<br>' +
                'Who are all good and deserving of all my love.<br>' +
                'I firmly resolve, with the help of Thy grace,<br>' +
                'to confess my sins, to do penance, and to amend my life.<br>' +
                'Amen.'
        }
    });

    app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $stateProvider.state('index', {
            url: '/index',
            abstract: true,
            templateUrl: 'index.html',
            controller: 'app-controller'
        });

        $stateProvider.state('index.home', {
            url: '/home',
            views: {
                main: {
                    templateUrl: 'home.html',
                    controller: 'home-controller'
                }
            }
        });
        
        $stateProvider.state('index.readings', {
            url: '/readings',
            views: {
                main: {
                    templateUrl: 'simple-menu.html',
                    controller: 'readings-controller'
                }
            }
        });
        
        $stateProvider.state('index.daily-readings', {
            url: '/readings/daily-readings',
            views: {
                main: {
                    templateUrl: 'daily-readings.html',
                    controller: 'daily-readings-controller'
                }
            }
        });
        
        $stateProvider.state('index.reflections', {
            url: '/readings/reflections',
            views: {
                main: {
                    templateUrl: 'simple-menu.html',
                    controller: 'reflections-controller'
                }
            }
        });
        
        $stateProvider.state('index.reflection-living-faith', {
            url: '/readings/reflections/living-faith',
            views: {
                main: {
                    templateUrl: 'reflection-living-faith.html',
                    controller: 'reflection-living-faith-controller'
                }
            }
        });
        
        $stateProvider.state('index.reflection-daily-scripture', {
            url: '/readings/reflections/daily-scripture',
            views: {
                main: {
                    templateUrl: 'reflection-daily-scripture.html',
                    controller: 'reflection-daily-scripture-controller'
                }
            }
        });
        
        $stateProvider.state('index.saints', {
            url: '/readings/saints',
            views: {
                main: {
                    templateUrl: 'simple-menu-url.html',
                    controller: 'saints-controller'
                }
            }
        });
        
        $stateProvider.state('index.saint', {
            url: '/readings/saints/saint',
            views: {
                main: {
                    templateUrl: 'saint.html',
                    controller: 'saint-controller'
                }
            }
        });
        
        $stateProvider.state('index.prayers', {
            url: '/prayers',
            views: {
                main: {
                    templateUrl: 'simple-menu.html',
                    controller: 'prayers-controller'
                }
            }
        });
        
        $stateProvider.state('index.divine-office', {
            url: '/prayers/divine-office',
            views: {
                main: {
                    templateUrl: 'simple-menu-url.html',
                    controller: 'divine-office-controller'
                }
            }
        });
        
        $stateProvider.state('index.divine-office-template', {
            url: '/prayers/divine-office/liturgy',
            views: {
                main: {
                    templateUrl: 'divine-office-template.html',
                    controller: 'divine-office-template-controller'
                }
            }
        });
        
        $stateProvider.state('index.rosaries', {
            url: '/prayers/rosaries',
            views: {
                main: {
                    templateUrl: 'simple-menu.html',
                    controller: 'rosaries-controller'
                }
            }
        });
        
        $stateProvider.state('index.rosary', {
            url: '/prayers/rosaries/rosary',
            views: {
                main: {
                    templateUrl: 'simple-menu.html',
                    controller: 'rosary-controller'
                }
            }
        });
        
        $stateProvider.state('index.rosary-joyful', {
            url: '/prayers/rosaries/rosary/joyful',
            views: {
                main: {
                    templateUrl: 'rosary-template.html',
                    controller: 'rosary-joyful-controller'
                }
            }
        });
        
        $stateProvider.state('index.rosary-luminous', {
            url: '/prayers/rosaries/rosary/luminous',
            views: {
                main: {
                    templateUrl: 'rosary-template.html',
                    controller: 'rosary-luminous-controller'
                }
            }
        });
        
        $stateProvider.state('index.rosary-sorrowful', {
            url: '/prayers/rosaries/rosary/sorrowful',
            views: {
                main: {
                    templateUrl: 'rosary-template.html',
                    controller: 'rosary-sorrowful-controller'
                }
            }
        });
        
        $stateProvider.state('index.rosary-glorious', {
            url: '/prayers/rosaries/rosary/glorious',
            views: {
                main: {
                    templateUrl: 'rosary-template.html',
                    controller: 'rosary-glorious-controller'
                }
            }
        });
        
        $stateProvider.state('index.stations-cross', {
            url: '/prayers/stations-cross',
            views: {
                main: {
                    templateUrl: 'stations-cross.html',
                    controller: 'stations-cross-controller'
                }
            }
        });
        
        $stateProvider.state('index.confession', {
            url: '/confession',
            views: {
                main: {
                    templateUrl: 'simple-menu.html',
                    controller: 'confession-controller'
                }
            }
        });
        
        $stateProvider.state('index.contrition', {
            url: '/confession/contrition',
            views: {
                main: {
                    templateUrl: 'prayer-simple.html',
                    controller: 'contrition-controller'
                }
            }
        });
        
        $stateProvider.state('index.conscience-exam', {
            url: '/confession/conscience-exam',
            views: {
                main: {
                    templateUrl: 'simple-menu.html',
                    controller: 'conscience-exam-controller'
                }
            }
        });
        
        $stateProvider.state('index.conscience-commandments', {
            url: '/confession/conscience-exam/commandments',
            views: {
                main: {
                    templateUrl: 'conscience-template.html',
                    controller: 'conscience-commandments-controller'
                }
            }
        });
        
        $stateProvider.state('index.conscience-social-teaching', {
            url: '/confession/conscience-exam/social-teaching',
            views: {
                main: {
                    templateUrl: 'conscience-template.html',
                    controller: 'conscience-social-teaching-controller'
                }
            }
        });
        
        $stateProvider.state('index.conscience-children', {
            url: '/confession/conscience-exam/children',
            views: {
                main: {
                    templateUrl: 'conscience-template.html',
                    controller: 'conscience-children-controller'
                }
            }
        });
        
        $stateProvider.state('index.conscience-young-adult', {
            url: '/confession/conscience-exam/young-adult',
            views: {
                main: {
                    templateUrl: 'conscience-template.html',
                    controller: 'conscience-young-adult-controller'
                }
            }
        });
        
        $stateProvider.state('index.conscience-single', {
            url: '/confession/conscience-exam/single',
            views: {
                main: {
                    templateUrl: 'conscience-template.html',
                    controller: 'conscience-single-controller'
                }
            }
        });
        
        $stateProvider.state('index.conscience-married', {
            url: '/confession/conscience-exam/married',
            views: {
                main: {
                    templateUrl: 'conscience-template.html',
                    controller: 'conscience-married-controller'
                }
            }
        });
        
        $stateProvider.state('index.settings', {
            url: '/settings',
            views: {
                main: {
                    templateUrl: 'settings.html',
                    controller: 'settings-controller'
                }
            }
        });

        $urlRouterProvider.otherwise('/index/home');

        $ionicConfigProvider.backButton.text('').previousTitleText(false);
        $ionicConfigProvider.views.transition('android');
    });

})();