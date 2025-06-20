"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4358],{9009:function(e,t,n){n.d(t,{Bt:function(){return ae},EK:function(){return K},ET:function(){return s8},IO:function(){return sU},JU:function(){return sr},PL:function(){return s4},QT:function(){return s2},Xo:function(){return sK},ad:function(){return sl},ar:function(){return s$},b9:function(){return sQ},hJ:function(){return sn},oe:function(){return s5},pl:function(){return s9},r7:function(){return s6}});var r,i,s,a,o=n(5723),l=n(6574),u=n(9858),h=n(3639),c=n(8597),d=n(2841);n(9079);var f=n(8620).Buffer;let m="@firebase/firestore",g="4.7.11";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}p.UNAUTHENTICATED=new p(null),p.GOOGLE_CREDENTIALS=new p("google-credentials-uid"),p.FIRST_PARTY=new p("first-party-uid"),p.MOCK_USER=new p("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let y="11.6.1",v=new u.Yd("@firebase/firestore");function w(){return v.logLevel}function _(e,...t){if(v.logLevel<=u.in.DEBUG){let n=t.map(I);v.debug(`Firestore (${y}): ${e}`,...n)}}function E(e,...t){if(v.logLevel<=u.in.ERROR){let n=t.map(I);v.error(`Firestore (${y}): ${e}`,...n)}}function T(e,...t){if(v.logLevel<=u.in.WARN){let n=t.map(I);v.warn(`Firestore (${y}): ${e}`,...n)}}function I(e){if("string"==typeof e)return e;try{/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */return JSON.stringify(e)}catch(t){return e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C(e,t,n){let r="Unexpected state";"string"==typeof t?r=t:n=t,S(e,r,n)}function S(e,t,n){let r=`FIRESTORE (${y}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(e){r+=" CONTEXT: "+n}throw E(r),Error(r)}function A(e,t,n,r){let i="Unexpected state";"string"==typeof n?i=n:r=n,e||S(t,i,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let N={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class b extends h.ZR{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class x{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(p.UNAUTHENTICATED))}shutdown(){}}class R{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class L{constructor(e){this.t=e,this.currentUser=p.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){A(void 0===this.o,42304);let n=this.i,r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve(),i=new k;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new k,e.enqueueRetryable(()=>r(this.currentUser))};let s=()=>{let t=i;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},a=e=>{_("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),s())};this.t.onInit(e=>a(e)),setTimeout(()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?a(e):(_("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new k)}},0),s()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(_("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(A("string"==typeof t.accessToken,31837,{l:t}),new D(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return A(null===e||"string"==typeof e,2055,{h:e}),new p(e)}}class V{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=p.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);let e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class M{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new V(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(p.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class O{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class F{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,(0,o.rh)(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){A(void 0===this.o,3512);let n=e=>{null!=e.error&&_("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);let n=e.token!==this.m;return this.m=e.token,_("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};let r=e=>{_("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){let e=this.V.getImmediate({optional:!0});e?r(e):_("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new O(this.p));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(A("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new O(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{static newId(){let e=62*Math.floor(256/62),t="";for(;t.length<20;){let n=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let t=0;t<e;t++)n[t]=Math.floor(256*Math.random());return n}(40);for(let r=0;r<n.length;++r)t.length<20&&n[r]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return t}}function q(e,t){return e<t?-1:e>t?1:0}function $(e,t){let n=0;for(;n<e.length&&n<t.length;){let r=e.codePointAt(n),i=t.codePointAt(n);if(r!==i){if(r<128&&i<128)return q(r,i);{let s=P(),a=function(e,t){for(let n=0;n<e.length&&n<t.length;++n)if(e[n]!==t[n])return q(e[n],t[n]);return q(e.length,t.length)}(s.encode(z(e,n)),s.encode(z(t,n)));return 0!==a?a:q(r,i)}}n+=r>65535?2:1}return q(e.length,t.length)}function z(e,t){return e.codePointAt(t)>65535?e.substring(t,t+2):e.substring(t,t+1)}function B(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}class K{static now(){return K.fromMillis(Date.now())}static fromDate(e){return K.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3);return new K(t,Math.floor((e-1e3*t)*1e6))}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new b(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800||e>=253402300800)throw new b(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?q(this.nanoseconds,e.nanoseconds):q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){return String(this.seconds- -62135596800).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{static fromTimestamp(e){return new G(e)}static min(){return new G(new K(0,0))}static max(){return new G(new K(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Q="__name__";class j{constructor(e,t,n){void 0===t?t=0:t>e.length&&C(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&C(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===j.comparator(this,e)}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof j?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let n=Math.min(e.length,t.length);for(let r=0;r<n;r++){let n=j.compareSegments(e.get(r),t.get(r));if(0!==n)return n}return q(e.length,t.length)}static compareSegments(e,t){let n=j.isNumericId(e),r=j.isNumericId(t);return n&&!r?-1:!n&&r?1:n&&r?j.extractNumericId(e).compare(j.extractNumericId(t)):$(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return c.z8.fromString(e.substring(4,e.length-2))}}class W extends j{construct(e,t,n){return new W(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let n of e){if(n.indexOf("//")>=0)throw new b(N.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new W(t)}static emptyPath(){return new W([])}}let H=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Y extends j{construct(e,t,n){return new Y(e,t,n)}static isValidIdentifier(e){return H.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Y.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===Q}static keyField(){return new Y([Q])}static fromServerFormat(e){let t=[],n="",r=0,i=()=>{if(0===n.length)throw new b(N.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""},s=!1;for(;r<e.length;){let t=e[r];if("\\"===t){if(r+1===e.length)throw new b(N.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new b(N.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?s=!s:"."!==t||s?n+=t:i(),r++}if(i(),s)throw new b(N.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Y(t)}static emptyPath(){return new Y([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(e){this.path=e}static fromPath(e){return new X(W.fromString(e))}static fromName(e){return new X(W.fromString(e).popFirst(5))}static empty(){return new X(W.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===W.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return W.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new X(new W(e.slice()))}}class J{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}J.UNKNOWN_ID=-1;class Z{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Z(G.min(),X.empty(),-1)}static max(){return new Z(G.max(),X.empty(),-1)}}class ee{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function et(e){if(e.code!==N.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==e.message)throw e;_("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&C(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new en((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof en?t:en.resolve(t)}catch(e){return en.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):en.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):en.reject(t)}static resolve(e){return new en((t,n)=>{t(e)})}static reject(e){return new en((t,n)=>{n(e)})}static waitFor(e){return new en((t,n)=>{let r=0,i=0,s=!1;e.forEach(e=>{++r,e.next(()=>{++i,s&&i===r&&t()},e=>n(e))}),s=!0,i===r&&t()})}static or(e){let t=en.resolve(!1);for(let n of e)t=t.next(e=>e?en.resolve(e):n());return t}static forEach(e,t){let n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new en((n,r)=>{let i=e.length,s=Array(i),a=0;for(let o=0;o<i;o++){let l=o;t(e[l]).next(e=>{s[l]=e,++a===i&&n(s)},e=>r(e))}})}static doWhile(e,t){return new en((n,r)=>{let i=()=>{!0===e()?t().next(()=>{i()},r):n()};i()})}}function er(e){return"IndexedDbTransactionError"===e.name}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ue(e),this.ce=e=>t.writeSequenceNumber(e))}ue(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ce&&this.ce(e),e}}function es(e){return 0===e&&1/e==-1/0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ea(e){let t=0;for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function eo(e,t){for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function el(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}ei.le=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e,t){this.comparator=e,this.root=t||ec.EMPTY}insert(e,t){return new eu(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ec.BLACK,null,null))}remove(e){return new eu(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ec.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){let r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){let e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new eh(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new eh(this.root,e,this.comparator,!1)}getReverseIterator(){return new eh(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new eh(this.root,e,this.comparator,!0)}}class eh{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ec{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:ec.RED,this.left=null!=r?r:ec.EMPTY,this.right=null!=i?i:ec.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,i){return new ec(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this,i=n(e,r.key);return(r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n))).fixUp()}removeMin(){if(this.left.isEmpty())return ec.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),(e=e.copy(null,null,null,e.left.removeMin(),null)).fixUp()}remove(e,t){let n,r=this;if(0>t(e,r.key))r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return ec.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight())).rotateLeft()).colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=(e=e.rotateRight()).colorFlip()),e}rotateLeft(){let e=this.copy(null,null,ec.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,ec.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){return Math.pow(2,this.check())<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw C(43730,{key:this.key,value:this.value});if(this.right.isRed())throw C(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw C(27949);return e+(this.isRed()?0:1)}}ec.EMPTY=null,ec.RED=!0,ec.BLACK=!1,ec.EMPTY=new class{constructor(){this.size=0}get key(){throw C(57766)}get value(){throw C(16141)}get color(){throw C(16727)}get left(){throw C(29726)}get right(){throw C(36894)}copy(e,t,n,r,i){return this}insert(e,t,n){return new ec(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ed{constructor(e){this.comparator=e,this.data=new eu(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){let n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){let r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ef(this.data.getIterator())}getIteratorFrom(e){return new ef(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof ed)||this.size!==e.size)return!1;let t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){let e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new ed(this.comparator);return t.data=e,t}}class ef{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{constructor(e){this.fields=e,e.sort(Y.comparator)}static empty(){return new em([])}unionWith(e){let t=new ed(Y.comparator);for(let e of this.fields)t=t.add(e);for(let n of e)t=t.add(n);return new em(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return B(this.fields,e.fields,(e,t)=>e.isEqual(t))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eg extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(e){this.binaryString=e}static fromBase64String(e){return new ep(function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new eg("Invalid base64 string: "+e):e}}(e))}static fromUint8Array(e){return new ep(function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e))}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return btoa(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ep.EMPTY_BYTE_STRING=new ep("");let ey=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ev(e){if(A(!!e,39018),"string"==typeof e){let t=0,n=ey.exec(e);if(A(!!n,46558,{timestamp:e}),n[1]){let e=n[1];t=Number(e=(e+"000000000").substr(0,9))}return{seconds:Math.floor(new Date(e).getTime()/1e3),nanos:t}}return{seconds:ew(e.seconds),nanos:ew(e.nanos)}}function ew(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function e_(e){return"string"==typeof e?ep.fromBase64String(e):ep.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eE="server_timestamp",eT="__type__",eI="__previous_value__",eC="__local_write_time__";function eS(e){var t,n;return(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{})[eT])||void 0===n?void 0:n.stringValue)===eE}function eA(e){let t=e.mapValue.fields[eI];return eS(t)?eA(t):t}function eN(e){let t=ev(e.mapValue.fields[eC].timestampValue);return new K(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eb{constructor(e,t,n,r,i,s,a,o,l){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=a,this.longPollingOptions=o,this.useFetchStreams=l}}let ek="(default)";class eD{constructor(e,t){this.projectId=e,this.database=t||ek}static empty(){return new eD("","")}get isDefaultDatabase(){return this.database===ek}isEqual(e){return e instanceof eD&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ex="__type__",eR="__max__",eL={mapValue:{fields:{__type__:{stringValue:eR}}}},eV="__vector__",eM="value";function eO(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?eS(e)?4:eX(e)?9007199254740991:eH(e)?10:11:C(28295,{value:e})}function eF(e,t){if(e===t)return!0;let n=eO(e);if(n!==eO(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return eN(e).isEqual(eN(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let n=ev(e.timestampValue),r=ev(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return e_(e.bytesValue).isEqual(e_(t.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return ew(e.geoPointValue.latitude)===ew(t.geoPointValue.latitude)&&ew(e.geoPointValue.longitude)===ew(t.geoPointValue.longitude);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return ew(e.integerValue)===ew(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){let n=ew(e.doubleValue),r=ew(t.doubleValue);return n===r?es(n)===es(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return B(e.arrayValue.values||[],t.arrayValue.values||[],eF);case 10:case 11:return function(e,t){let n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(ea(n)!==ea(r))return!1;for(let e in n)if(n.hasOwnProperty(e)&&(void 0===r[e]||!eF(n[e],r[e])))return!1;return!0}(e,t);default:return C(52216,{left:e})}}function eP(e,t){return void 0!==(e.values||[]).find(e=>eF(e,t))}function eU(e,t){if(e===t)return 0;let n=eO(e),r=eO(t);if(n!==r)return q(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return q(e.booleanValue,t.booleanValue);case 2:return function(e,t){let n=ew(e.integerValue||e.doubleValue),r=ew(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return eq(e.timestampValue,t.timestampValue);case 4:return eq(eN(e),eN(t));case 5:return $(e.stringValue,t.stringValue);case 6:return function(e,t){let n=e_(e),r=e_(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let n=e.split("/"),r=t.split("/");for(let e=0;e<n.length&&e<r.length;e++){let t=q(n[e],r[e]);if(0!==t)return t}return q(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let n=q(ew(e.latitude),ew(t.latitude));return 0!==n?n:q(ew(e.longitude),ew(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return e$(e.arrayValue,t.arrayValue);case 10:return function(e,t){var n,r,i,s;let a=e.fields||{},o=t.fields||{},l=null===(n=a[eM])||void 0===n?void 0:n.arrayValue,u=null===(r=o[eM])||void 0===r?void 0:r.arrayValue,h=q((null===(i=null==l?void 0:l.values)||void 0===i?void 0:i.length)||0,(null===(s=null==u?void 0:u.values)||void 0===s?void 0:s.length)||0);return 0!==h?h:e$(l,u)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===eL.mapValue&&t===eL.mapValue)return 0;if(e===eL.mapValue)return 1;if(t===eL.mapValue)return -1;let n=e.fields||{},r=Object.keys(n),i=t.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let e=0;e<r.length&&e<s.length;++e){let t=$(r[e],s[e]);if(0!==t)return t;let a=eU(n[r[e]],i[s[e]]);if(0!==a)return a}return q(r.length,s.length)}(e.mapValue,t.mapValue);default:throw C(23264,{Pe:n})}}function eq(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return q(e,t);let n=ev(e),r=ev(t),i=q(n.seconds,r.seconds);return 0!==i?i:q(n.nanos,r.nanos)}function e$(e,t){let n=e.values||[],r=t.values||[];for(let e=0;e<n.length&&e<r.length;++e){let t=eU(n[e],r[e]);if(t)return t}return q(n.length,r.length)}function ez(e){var t,n;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){let t=ev(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?e_(e.bytesValue).toBase64():"referenceValue"in e?(t=e.referenceValue,X.fromName(t).toString()):"geoPointValue"in e?(n=e.geoPointValue,`geo(${n.latitude},${n.longitude})`):"arrayValue"in e?function(e){let t="[",n=!0;for(let r of e.values||[])n?n=!1:t+=",",t+=ez(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){let t=Object.keys(e.fields||{}).sort(),n="{",r=!0;for(let i of t)r?r=!1:n+=",",n+=`${i}:${ez(e.fields[i])}`;return n+"}"}(e.mapValue):C(61005,{value:e})}function eB(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function eK(e){return!!e&&"integerValue"in e}function eG(e){return!!e&&"arrayValue"in e}function eQ(e){return!!e&&"nullValue"in e}function ej(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function eW(e){return!!e&&"mapValue"in e}function eH(e){var t,n;return(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{})[ex])||void 0===n?void 0:n.stringValue)===eV}function eY(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){let t={mapValue:{fields:{}}};return eo(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=eY(n)),t}if(e.arrayValue){let t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=eY(e.arrayValue.values[n]);return t}return Object.assign({},e)}function eX(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===eR}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eJ{constructor(e){this.value=e}static empty(){return new eJ({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(!eW(t=(t.mapValue.fields||{})[e.get(n)]))return null;return(t=(t.mapValue.fields||{})[e.lastSegment()])||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=eY(t)}setAll(e){let t=Y.emptyPath(),n={},r=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){let e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=eY(e):r.push(i.lastSegment())});let i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){let t=this.field(e.popLast());eW(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return eF(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];eW(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){for(let r of(eo(t,(t,n)=>e[t]=n),n))delete e[r]}clone(){return new eJ(eY(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eZ{constructor(e,t,n,r,i,s,a){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=i,this.data=s,this.documentState=a}static newInvalidDocument(e){return new eZ(e,0,G.min(),G.min(),G.min(),eJ.empty(),0)}static newFoundDocument(e,t,n,r){return new eZ(e,1,t,G.min(),n,r,0)}static newNoDocument(e,t){return new eZ(e,2,t,G.min(),G.min(),eJ.empty(),0)}static newUnknownDocument(e,t){return new eZ(e,3,t,G.min(),G.min(),eJ.empty(),2)}convertToFoundDocument(e,t){return this.createTime.isEqual(G.min())&&(2===this.documentType||0===this.documentType)&&(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=eJ.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=eJ.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=G.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof eZ&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new eZ(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e0{constructor(e,t){this.position=e,this.inclusive=t}}function e1(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){let s=t[i],a=e.position[i];if(r=s.field.isKeyField()?X.comparator(X.fromName(a.referenceValue),n.key):eU(a,n.data.field(s.field)),"desc"===s.dir&&(r*=-1),0!==r)break}return r}function e2(e,t){if(null===e)return null===t;if(null===t||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!eF(e.position[n],t.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e3{constructor(e,t="asc"){this.field=e,this.dir=t}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e4{}class e9 extends e4{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new e7(e,t,n):"array-contains"===t?new tr(e,n):"in"===t?new ti(e,n):"not-in"===t?new ts(e,n):"array-contains-any"===t?new ta(e,n):new e9(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new te(e,n):new tt(e,n)}matches(e){let t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(eU(t,this.value)):null!==t&&eO(this.value)===eO(t)&&this.matchesComparison(eU(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return C(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class e6 extends e4{constructor(e,t){super(),this.filters=e,this.op=t,this.Te=null}static create(e,t){return new e6(e,t)}matches(e){return e5(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Te||(this.Te=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Te}getFilters(){return Object.assign([],this.filters)}}function e5(e){return"and"===e.op}function e8(e){for(let t of e.filters)if(t instanceof e6)return!1;return!0}class e7 extends e9{constructor(e,t,n){super(e,t,n),this.key=X.fromName(n.referenceValue)}matches(e){let t=X.comparator(e.key,this.key);return this.matchesComparison(t)}}class te extends e9{constructor(e,t){super(e,"in",t),this.keys=tn("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class tt extends e9{constructor(e,t){super(e,"not-in",t),this.keys=tn("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function tn(e,t){var n;return((null===(n=t.arrayValue)||void 0===n?void 0:n.values)||[]).map(e=>X.fromName(e.referenceValue))}class tr extends e9{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return eG(t)&&eP(t.arrayValue,this.value)}}class ti extends e9{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return null!==t&&eP(this.value.arrayValue,t)}}class ts extends e9{constructor(e,t){super(e,"not-in",t)}matches(e){if(eP(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!eP(this.value.arrayValue,t)}}class ta extends e9{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!eG(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>eP(this.value.arrayValue,e))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e,t=null,n=[],r=[],i=null,s=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=a,this.Ie=null}}function tl(e,t=null,n=[],r=[],i=null,s=null,a=null){return new to(e,t,n,r,i,s,a)}function tu(e){if(null===e.Ie){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:"+e.filters.map(e=>(function e(t){if(t instanceof e9)return t.field.canonicalString()+t.op.toString()+ez(t.value);if(e8(t)&&e5(t))return t.filters.map(t=>e(t)).join(",");{let n=t.filters.map(t=>e(t)).join(",");return`${t.op}(${n})`}})(e)).join(",")+"|ob:"+e.orderBy.map(e=>e.field.canonicalString()+e.dir).join(","),null==e.limit||(t+="|l:"+e.limit),e.startAt&&(t+="|lb:"+(e.startAt.inclusive?"b:":"a:")+e.startAt.position.map(e=>ez(e)).join(",")),e.endAt&&(t+="|ub:"+(e.endAt.inclusive?"a:":"b:")+e.endAt.position.map(e=>ez(e)).join(",")),e.Ie=t}return e.Ie}function th(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let i=0;i<e.orderBy.length;i++){var n,r;if(n=e.orderBy[i],r=t.orderBy[i],!(n.dir===r.dir&&n.field.isEqual(r.field)))return!1}if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!function e(t,n){return t instanceof e9?n instanceof e9&&t.op===n.op&&t.field.isEqual(n.field)&&eF(t.value,n.value):t instanceof e6?n instanceof e6&&t.op===n.op&&t.filters.length===n.filters.length&&t.filters.reduce((t,r,i)=>t&&e(r,n.filters[i]),!0):void C(19439)}(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!e2(e.startAt,t.startAt)&&e2(e.endAt,t.endAt)}function tc(e){return X.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class td{constructor(e,t=null,n=[],r=[],i=null,s="F",a=null,o=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=a,this.endAt=o,this.Ee=null,this.de=null,this.Ae=null,this.startAt,this.endAt}}function tf(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function tm(e){return null!==e.collectionGroup}function tg(e){if(null===e.Ee){let t;e.Ee=[];let n=new Set;for(let t of e.explicitOrderBy)e.Ee.push(t),n.add(t.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(t=new ed(Y.comparator),e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t).forEach(t=>{n.has(t.canonicalString())||t.isKeyField()||e.Ee.push(new e3(t,r))}),n.has(Y.keyField().canonicalString())||e.Ee.push(new e3(Y.keyField(),r))}return e.Ee}function tp(e){return e.de||(e.de=function(e,t){if("F"===e.limitType)return tl(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{let t="desc"===e.dir?"asc":"desc";return new e3(e.field,t)});let n=e.endAt?new e0(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new e0(e.startAt.position,e.startAt.inclusive):null;return tl(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}(e,tg(e))),e.de}function ty(e,t){let n=e.filters.concat([t]);return new td(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function tv(e,t,n){return new td(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function tw(e,t){return th(tp(e),tp(t))&&e.limitType===t.limitType}function t_(e){return`${tu(tp(e))}|lt:${e.limitType}`}function tE(e){var t;let n;return`Query(target=${n=(t=tp(e)).path.canonicalString(),null!==t.collectionGroup&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(e=>(function e(t){return t instanceof e9?`${t.field.canonicalString()} ${t.op} ${ez(t.value)}`:t instanceof e6?t.op.toString()+" {"+t.getFilters().map(e).join(" ,")+"}":"Filter"})(e)).join(", ")}]`),null==t.limit||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(e=>`${e.field.canonicalString()} (${e.dir})`).join(", ")}]`),t.startAt&&(n+=", startAt: "+(t.startAt.inclusive?"b:":"a:")+t.startAt.position.map(e=>ez(e)).join(",")),t.endAt&&(n+=", endAt: "+(t.endAt.inclusive?"a:":"b:")+t.endAt.position.map(e=>ez(e)).join(",")),`Target(${n})`}; limitType=${e.limitType})`}function tT(e,t){return t.isFoundDocument()&&function(e,t){let n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):X.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(let n of tg(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(let n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&(!e.startAt||!!function(e,t,n){let r=e1(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,tg(e),t))&&(!e.endAt||!!function(e,t,n){let r=e1(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,tg(e),t))}function tI(e){return(t,n)=>{let r=!1;for(let i of tg(e)){let e=function(e,t,n){let r=e.field.isKeyField()?X.comparator(t.key,n.key):function(e,t,n){let r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?eU(r,i):C(42886)}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return -1*r;default:return C(19790,{direction:e.dir})}}(i,t,n);if(0!==e)return e;r=r||i.field.isKeyField()}return 0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tC{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n){for(let[t,r]of n)if(this.equalsFn(t,e))return r}}has(e){return void 0!==this.get(e)}set(e,t){let n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return void(r[n]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){eo(this.inner,(t,n)=>{for(let[t,r]of n)e(t,r)})}isEmpty(){return el(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tS=new eu(X.comparator),tA=new eu(X.comparator);function tN(...e){let t=tA;for(let n of e)t=t.insert(n.key,n);return t}function tb(e){let t=tA;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function tk(){return new tC(e=>e.toString(),(e,t)=>e.isEqual(t))}let tD=new eu(X.comparator),tx=new ed(X.comparator);function tR(...e){let t=tx;for(let n of e)t=t.add(n);return t}let tL=new ed(q);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tV(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:es(t)?"-0":t}}function tM(e){return{integerValue:""+e}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tO{constructor(){this._=void 0}}function tF(e,t){return e instanceof tB?eK(t)||t&&"doubleValue"in t?t:{integerValue:0}:null}class tP extends tO{}class tU extends tO{constructor(e){super(),this.elements=e}}function tq(e,t){let n=tG(t);for(let t of e.elements)n.some(e=>eF(e,t))||n.push(t);return{arrayValue:{values:n}}}class t$ extends tO{constructor(e){super(),this.elements=e}}function tz(e,t){let n=tG(t);for(let t of e.elements)n=n.filter(e=>!eF(e,t));return{arrayValue:{values:n}}}class tB extends tO{constructor(e,t){super(),this.serializer=e,this.Re=t}}function tK(e){return ew(e.integerValue||e.doubleValue)}function tG(e){return eG(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tQ{constructor(e,t){this.field=e,this.transform=t}}class tj{constructor(e,t){this.version=e,this.transformResults=t}}class tW{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new tW}static exists(e){return new tW(void 0,e)}static updateTime(e){return new tW(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function tH(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class tY{}function tX(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new t9(e.key,tW.none()):new t0(e.key,e.data,tW.none());{let n=e.data,r=eJ.empty(),i=new ed(Y.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),i=i.add(e)}return new t1(e.key,r,new em(i.toArray()),tW.none())}}function tJ(e,t,n,r){return e instanceof t0?function(e,t,n,r){if(!tH(e.precondition,t))return n;let i=e.value.clone(),s=t4(e.fieldTransforms,r,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof t1?function(e,t,n,r){if(!tH(e.precondition,t))return n;let i=t4(e.fieldTransforms,r,t),s=t.data;return(s.setAll(t2(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===n)?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):tH(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}function tZ(e,t){var n,r;return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(n=e.fieldTransforms,r=t.fieldTransforms,!!(void 0===n&&void 0===r||!(!n||!r)&&B(n,r,(e,t)=>{var n,r;return e.field.isEqual(t.field)&&(n=e.transform,r=t.transform,n instanceof tU&&r instanceof tU||n instanceof t$&&r instanceof t$?B(n.elements,r.elements,eF):n instanceof tB&&r instanceof tB?eF(n.Re,r.Re):n instanceof tP&&r instanceof tP)})))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class t0 extends tY{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class t1 extends tY{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function t2(e){let t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){let r=e.data.field(n);t.set(n,r)}}),t}function t3(e,t,n){let r=new Map;A(e.length===n.length,32656,{Ve:n.length,me:e.length});for(let s=0;s<n.length;s++){var i;let a=e[s],o=a.transform,l=t.data.field(a.field);r.set(a.field,(i=n[s],o instanceof tU?tq(o,l):o instanceof t$?tz(o,l):i))}return r}function t4(e,t,n){let r=new Map;for(let i of e){let e=i.transform,s=n.data.field(i.field);r.set(i.field,e instanceof tP?function(e,t){let n={fields:{[eT]:{stringValue:eE},[eC]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&eS(t)&&(t=eA(t)),t&&(n.fields[eI]=t),{mapValue:n}}(t,s):e instanceof tU?tq(e,s):e instanceof t$?tz(e,s):function(e,t){let n=tF(e,t),r=tK(n)+tK(e.Re);return eK(n)&&eK(e.Re)?tM(r):tV(e.serializer,r)}(e,s))}return r}class t9 extends tY{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class t6 extends tY{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t5{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){let n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){let i=this.mutations[t];if(i.key.isEqual(e.key)){var r;r=n[t],i instanceof t0?function(e,t,n){let r=e.value.clone(),i=t3(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(i,e,r):i instanceof t1?function(e,t,n){if(!tH(e.precondition,t))return void t.convertToUnknownDocument(n.version);let r=t3(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(t2(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(i,e,r):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,e,r)}}}applyToLocalView(e,t){for(let n of this.baseMutations)n.key.isEqual(e.key)&&(t=tJ(n,e,t,this.localWriteTime));for(let n of this.mutations)n.key.isEqual(e.key)&&(t=tJ(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let n=tk();return this.mutations.forEach(r=>{let i=e.get(r.key),s=i.overlayedDocument,a=this.applyToLocalView(s,i.mutatedFields),o=tX(s,a=t.has(r.key)?null:a);null!==o&&n.set(r.key,o),s.isValidDocument()||s.convertToNoDocument(G.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),tR())}isEqual(e){return this.batchId===e.batchId&&B(this.mutations,e.mutations,(e,t)=>tZ(e,t))&&B(this.baseMutations,e.baseMutations,(e,t)=>tZ(e,t))}}class t8{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){A(e.mutations.length===n.length,58842,{fe:e.mutations.length,ge:n.length});let r=tD,i=e.mutations;for(let e=0;e<i.length;e++)r=r.insert(i[e].key,n[e].version);return new t8(e,t,n,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t7{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(e,t){this.count=e,this.unchangedNames=t}}function nt(e){if(void 0===e)return E("GRPC error has no .code"),N.UNKNOWN;switch(e){case r.OK:return N.OK;case r.CANCELLED:return N.CANCELLED;case r.UNKNOWN:return N.UNKNOWN;case r.DEADLINE_EXCEEDED:return N.DEADLINE_EXCEEDED;case r.RESOURCE_EXHAUSTED:return N.RESOURCE_EXHAUSTED;case r.INTERNAL:return N.INTERNAL;case r.UNAVAILABLE:return N.UNAVAILABLE;case r.UNAUTHENTICATED:return N.UNAUTHENTICATED;case r.INVALID_ARGUMENT:return N.INVALID_ARGUMENT;case r.NOT_FOUND:return N.NOT_FOUND;case r.ALREADY_EXISTS:return N.ALREADY_EXISTS;case r.PERMISSION_DENIED:return N.PERMISSION_DENIED;case r.FAILED_PRECONDITION:return N.FAILED_PRECONDITION;case r.ABORTED:return N.ABORTED;case r.OUT_OF_RANGE:return N.OUT_OF_RANGE;case r.UNIMPLEMENTED:return N.UNIMPLEMENTED;case r.DATA_LOSS:return N.DATA_LOSS;default:return C(39323,{code:e})}}(i=r||(r={}))[i.OK=0]="OK",i[i.CANCELLED=1]="CANCELLED",i[i.UNKNOWN=2]="UNKNOWN",i[i.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",i[i.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",i[i.NOT_FOUND=5]="NOT_FOUND",i[i.ALREADY_EXISTS=6]="ALREADY_EXISTS",i[i.PERMISSION_DENIED=7]="PERMISSION_DENIED",i[i.UNAUTHENTICATED=16]="UNAUTHENTICATED",i[i.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",i[i.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",i[i.ABORTED=10]="ABORTED",i[i.OUT_OF_RANGE=11]="OUT_OF_RANGE",i[i.UNIMPLEMENTED=12]="UNIMPLEMENTED",i[i.INTERNAL=13]="INTERNAL",i[i.UNAVAILABLE=14]="UNAVAILABLE",i[i.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nn=new c.z8([4294967295,4294967295],0);function nr(e){let t=P().encode(e),n=new c.V8;return n.update(t),new Uint8Array(n.digest())}function ni(e){let t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),i=t.getUint32(8,!0),s=t.getUint32(12,!0);return[new c.z8([n,r],0),new c.z8([i,s],0)]}class ns{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new na(`Invalid padding: ${t}`);if(n<0||e.length>0&&0===this.hashCount)throw new na(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new na(`Invalid padding when bitmap length is 0: ${t}`);this.pe=8*e.length-t,this.ye=c.z8.fromNumber(this.pe)}we(e,t,n){let r=e.add(t.multiply(c.z8.fromNumber(n)));return 1===r.compare(nn)&&(r=new c.z8([r.getBits(0),r.getBits(1)],0)),r.modulo(this.ye).toNumber()}be(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.pe)return!1;let[t,n]=ni(nr(e));for(let e=0;e<this.hashCount;e++){let r=this.we(t,n,e);if(!this.be(r))return!1}return!0}static create(e,t,n){let r=new ns(new Uint8Array(Math.ceil(e/8)),e%8==0?0:8-e%8,t);return n.forEach(e=>r.insert(e)),r}insert(e){if(0===this.pe)return;let[t,n]=ni(nr(e));for(let e=0;e<this.hashCount;e++){let r=this.we(t,n,e);this.Se(r)}}Se(e){this.bitmap[Math.floor(e/8)]|=1<<e%8}}class na extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){let r=new Map;return r.set(e,nl.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new no(G.min(),r,new eu(q),tS,tR())}}class nl{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new nl(n,t,tR(),tR(),tR())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{constructor(e,t,n,r){this.De=e,this.removedTargetIds=t,this.key=n,this.ve=r}}class nh{constructor(e,t){this.targetId=e,this.Ce=t}}class nc{constructor(e,t,n=ep.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class nd{constructor(){this.Fe=0,this.Me=ng(),this.xe=ep.EMPTY_BYTE_STRING,this.Oe=!1,this.Ne=!0}get current(){return this.Oe}get resumeToken(){return this.xe}get Be(){return 0!==this.Fe}get Le(){return this.Ne}ke(e){e.approximateByteSize()>0&&(this.Ne=!0,this.xe=e)}qe(){let e=tR(),t=tR(),n=tR();return this.Me.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:C(38017,{changeType:i})}}),new nl(this.xe,this.Oe,e,t,n)}Qe(){this.Ne=!1,this.Me=ng()}$e(e,t){this.Ne=!0,this.Me=this.Me.insert(e,t)}Ue(e){this.Ne=!0,this.Me=this.Me.remove(e)}Ke(){this.Fe+=1}We(){this.Fe-=1,A(this.Fe>=0,3241,{Fe:this.Fe})}Ge(){this.Ne=!0,this.Oe=!0}}class nf{constructor(e){this.ze=e,this.je=new Map,this.He=tS,this.Je=nm(),this.Ye=nm(),this.Ze=new eu(q)}Xe(e){for(let t of e.De)e.ve&&e.ve.isFoundDocument()?this.et(t,e.ve):this.tt(t,e.key,e.ve);for(let t of e.removedTargetIds)this.tt(t,e.key,e.ve)}nt(e){this.forEachTarget(e,t=>{let n=this.rt(t);switch(e.state){case 0:this.it(t)&&n.ke(e.resumeToken);break;case 1:n.We(),n.Be||n.Qe(),n.ke(e.resumeToken);break;case 2:n.We(),n.Be||this.removeTarget(t);break;case 3:this.it(t)&&(n.Ge(),n.ke(e.resumeToken));break;case 4:this.it(t)&&(this.st(t),n.ke(e.resumeToken));break;default:C(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.je.forEach((e,n)=>{this.it(n)&&t(n)})}ot(e){let t=e.targetId,n=e.Ce.count,r=this._t(t);if(r){let i=r.target;if(tc(i)){if(0===n){let e=new X(i.path);this.tt(t,e,eZ.newNoDocument(e,G.min()))}else A(1===n,20013,{expectedCount:n})}else{let r=this.ut(t);if(r!==n){let n=this.ct(e),i=n?this.lt(n,e,r):1;0!==i&&(this.st(t),this.Ze=this.Ze.insert(t,2===i?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch"))}}}}ct(e){let t,n;let r=e.Ce.unchangedNames;if(!r||!r.bits)return null;let{bits:{bitmap:i="",padding:s=0},hashCount:a=0}=r;try{t=e_(i).toUint8Array()}catch(e){if(e instanceof eg)return T("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{n=new ns(t,s,a)}catch(e){return T(e instanceof na?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===n.pe?null:n}lt(e,t,n){return t.Ce.count===n-this.Tt(e,t.targetId)?0:2}Tt(e,t){let n=this.ze.getRemoteKeysForTarget(t),r=0;return n.forEach(n=>{let i=this.ze.Pt(),s=`projects/${i.projectId}/databases/${i.database}/documents/${n.path.canonicalString()}`;e.mightContain(s)||(this.tt(t,n,null),r++)}),r}It(e){let t=new Map;this.je.forEach((n,r)=>{let i=this._t(r);if(i){if(n.current&&tc(i.target)){let t=new X(i.target.path);this.Et(t).has(r)||this.dt(r,t)||this.tt(r,t,eZ.newNoDocument(t,e))}n.Le&&(t.set(r,n.qe()),n.Qe())}});let n=tR();this.Ye.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{let t=this._t(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.He.forEach((t,n)=>n.setReadTime(e));let r=new no(e,t,this.Ze,this.He,n);return this.He=tS,this.Je=nm(),this.Ye=nm(),this.Ze=new eu(q),r}et(e,t){if(!this.it(e))return;let n=this.dt(e,t.key)?2:0;this.rt(e).$e(t.key,n),this.He=this.He.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.Ye=this.Ye.insert(t.key,this.At(t.key).add(e))}tt(e,t,n){if(!this.it(e))return;let r=this.rt(e);this.dt(e,t)?r.$e(t,1):r.Ue(t),this.Ye=this.Ye.insert(t,this.At(t).delete(e)),this.Ye=this.Ye.insert(t,this.At(t).add(e)),n&&(this.He=this.He.insert(t,n))}removeTarget(e){this.je.delete(e)}ut(e){let t=this.rt(e).qe();return this.ze.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ke(e){this.rt(e).Ke()}rt(e){let t=this.je.get(e);return t||(t=new nd,this.je.set(e,t)),t}At(e){let t=this.Ye.get(e);return t||(t=new ed(q),this.Ye=this.Ye.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new ed(q),this.Je=this.Je.insert(e,t)),t}it(e){let t=null!==this._t(e);return t||_("WatchChangeAggregator","Detected inactive target",e),t}_t(e){let t=this.je.get(e);return t&&t.Be?null:this.ze.Rt(e)}st(e){this.je.set(e,new nd),this.ze.getRemoteKeysForTarget(e).forEach(t=>{this.tt(e,t,null)})}dt(e,t){return this.ze.getRemoteKeysForTarget(e).has(t)}}function nm(){return new eu(X.comparator)}function ng(){return new eu(X.comparator)}let np={asc:"ASCENDING",desc:"DESCENDING"},ny={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},nv={and:"AND",or:"OR"};class nw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function n_(e,t){return e.useProto3Json||null==t?t:{value:t}}function nE(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function nT(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function nI(e){return A(!!e,49232),G.fromTimestamp(function(e){let t=ev(e);return new K(t.seconds,t.nanos)}(e))}function nC(e,t){return nS(e,t).canonicalString()}function nS(e,t){let n=new W(["projects",e.projectId,"databases",e.database]).child("documents");return void 0===t?n:n.child(t)}function nA(e){let t=W.fromString(e);return A(nM(t),10190,{key:t.toString()}),t}function nN(e,t){return nC(e.databaseId,t.path)}function nb(e,t){let n=nA(t);if(n.get(1)!==e.databaseId.projectId)throw new b(N.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new b(N.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new X(nx(n))}function nk(e,t){return nC(e.databaseId,t)}function nD(e){return new W(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function nx(e){return A(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function nR(e,t,n){return{name:nN(e,t),fields:n.value.mapValue.fields}}function nL(e){return{fieldPath:e.canonicalString()}}function nV(e){return Y.fromServerFormat(e.fieldPath)}function nM(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nO{constructor(e,t,n,r,i=G.min(),s=G.min(),a=ep.EMPTY_BYTE_STRING,o=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=a,this.expectedCount=o}withSequenceNumber(e){return new nO(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new nO(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new nO(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new nO(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nF{constructor(e){this.wt=e}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nP{constructor(){}vt(e,t){this.Ct(e,t),t.Ft()}Ct(e,t){if("nullValue"in e)this.Mt(t,5);else if("booleanValue"in e)this.Mt(t,10),t.xt(e.booleanValue?1:0);else if("integerValue"in e)this.Mt(t,15),t.xt(ew(e.integerValue));else if("doubleValue"in e){let n=ew(e.doubleValue);isNaN(n)?this.Mt(t,13):(this.Mt(t,15),es(n)?t.xt(0):t.xt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Mt(t,20),"string"==typeof n&&(n=ev(n)),t.Ot(`${n.seconds||""}`),t.xt(n.nanos||0)}else if("stringValue"in e)this.Nt(e.stringValue,t),this.Bt(t);else if("bytesValue"in e)this.Mt(t,30),t.Lt(e_(e.bytesValue)),this.Bt(t);else if("referenceValue"in e)this.kt(e.referenceValue,t);else if("geoPointValue"in e){let n=e.geoPointValue;this.Mt(t,45),t.xt(n.latitude||0),t.xt(n.longitude||0)}else"mapValue"in e?eX(e)?this.Mt(t,Number.MAX_SAFE_INTEGER):eH(e)?this.qt(e.mapValue,t):(this.Qt(e.mapValue,t),this.Bt(t)):"arrayValue"in e?(this.$t(e.arrayValue,t),this.Bt(t)):C(19022,{Ut:e})}Nt(e,t){this.Mt(t,25),this.Kt(e,t)}Kt(e,t){t.Ot(e)}Qt(e,t){let n=e.fields||{};for(let e of(this.Mt(t,55),Object.keys(n)))this.Nt(e,t),this.Ct(n[e],t)}qt(e,t){var n,r;let i=e.fields||{};this.Mt(t,53);let s=(null===(r=null===(n=i[eM].arrayValue)||void 0===n?void 0:n.values)||void 0===r?void 0:r.length)||0;this.Mt(t,15),t.xt(ew(s)),this.Nt(eM,t),this.Ct(i[eM],t)}$t(e,t){let n=e.values||[];for(let e of(this.Mt(t,50),n))this.Ct(e,t)}kt(e,t){this.Mt(t,37),X.fromName(e).path.forEach(e=>{this.Mt(t,60),this.Kt(e,t)})}Mt(e,t){e.xt(t)}Bt(e){e.xt(2)}}nP.Wt=new nP;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nU{constructor(){this.yn=new nq}addToCollectionParentIndex(e,t){return this.yn.add(t),en.resolve()}getCollectionParents(e,t){return en.resolve(this.yn.getEntries(t))}addFieldIndex(e,t){return en.resolve()}deleteFieldIndex(e,t){return en.resolve()}deleteAllFieldIndexes(e){return en.resolve()}createTargetIndexes(e,t){return en.resolve()}getDocumentsMatchingTarget(e,t){return en.resolve(null)}getIndexType(e,t){return en.resolve(0)}getFieldIndexes(e,t){return en.resolve([])}getNextCollectionGroupToUpdate(e){return en.resolve(null)}getMinOffset(e,t){return en.resolve(Z.min())}getMinOffsetFromCollectionGroup(e,t){return en.resolve(Z.min())}updateCollectionGroup(e,t,n){return en.resolve()}updateIndexEntries(e,t){return en.resolve()}}class nq{constructor(){this.index={}}add(e){let t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new ed(W.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){let t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new ed(W.comparator)).toArray()}}new Uint8Array(0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let n$={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class nz{static withCacheSize(e){return new nz(e,nz.DEFAULT_COLLECTION_PERCENTILE,nz.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */nz.DEFAULT_COLLECTION_PERCENTILE=10,nz.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,nz.DEFAULT=new nz(41943040,nz.DEFAULT_COLLECTION_PERCENTILE,nz.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),nz.DISABLED=new nz(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nB{constructor(e){this.nr=e}next(){return this.nr+=2,this.nr}static rr(){return new nB(0)}static ir(){return new nB(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nK="LruGarbageCollector";function nG([e,t],[n,r]){let i=q(e,n);return 0===i?q(t,r):i}class nQ{constructor(e){this.cr=e,this.buffer=new ed(nG),this.lr=0}hr(){return++this.lr}Pr(e){let t=[e,this.hr()];if(this.buffer.size<this.cr)this.buffer=this.buffer.add(t);else{let e=this.buffer.last();0>nG(t,e)&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class nj{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Tr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Ir(6e4)}stop(){this.Tr&&(this.Tr.cancel(),this.Tr=null)}get started(){return null!==this.Tr}Ir(e){_(nK,`Garbage collection scheduled in ${e}ms`),this.Tr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Tr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){er(e)?_(nK,"Ignoring IndexedDB error during garbage collection: ",e):await et(e)}await this.Ir(3e5)})}}class nW{constructor(e,t){this.Er=e,this.params=t}calculateTargetCount(e,t){return this.Er.dr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return en.resolve(ei.le);let n=new nQ(t);return this.Er.forEachTarget(e,e=>n.Pr(e.sequenceNumber)).next(()=>this.Er.Ar(e,e=>n.Pr(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Er.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Er.removeOrphanedDocuments(e,t)}collect(e,t){return -1===this.params.cacheSizeCollectionThreshold?(_("LruGarbageCollector","Garbage collection skipped; disabled"),en.resolve(n$)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(_("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),n$):this.Rr(e,t))}getCacheSize(e){return this.Er.getCacheSize(e)}Rr(e,t){let n,r,i,s,a,o,l;let h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(_("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,s=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,a=Date.now(),this.removeTargets(e,n,t))).next(t=>(i=t,o=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(l=Date.now(),w()<=u.in.DEBUG&&_("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${s-h}ms
	Determined least recently used ${r} in `+(a-s)+"ms\n"+`	Removed ${i} targets in `+(o-a)+"ms\n"+`	Removed ${e} documents in `+(l-o)+"ms\n"+`Total Duration: ${l-h}ms`),en.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:e})))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nH{constructor(){this.changes=new tC(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,eZ.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let n=this.changes.get(t);return void 0!==n?en.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nY{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nX{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&tJ(n.mutation,e,em.empty(),K.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,tR()).next(()=>t))}getLocalViewOfDocuments(e,t,n=tR()){let r=tk();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=tN();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){let n=tk();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,tR()))}populateOverlays(e,t,n){let r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let i=tS,s=tk(),a=tk();return t.forEach((e,t)=>{let a=n.get(t.key);r.has(t.key)&&(void 0===a||a.mutation instanceof t1)?i=i.insert(t.key,t):void 0!==a?(s.set(t.key,a.mutation.getFieldMask()),tJ(a.mutation,t,a.mutation.getFieldMask(),K.now())):s.set(t.key,em.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>{var n;return a.set(e,new nY(t,null!==(n=s.get(e))&&void 0!==n?n:null))}),a))}recalculateAndSaveOverlays(e,t){let n=tk(),r=new eu((e,t)=>e-t),i=tR();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(let i of e)i.keys().forEach(e=>{let s=t.get(e);if(null===s)return;let a=n.get(e)||em.empty();a=i.applyToLocalView(s,a),n.set(e,a);let o=(r.get(i.batchId)||tR()).add(e);r=r.insert(i.batchId,o)})}).next(()=>{let s=[],a=r.getReverseIterator();for(;a.hasNext();){let r=a.getNext(),o=r.key,l=r.value,u=tk();l.forEach(e=>{if(!i.has(e)){let r=tX(t.get(e),n.get(e));null!==r&&u.set(e,r),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,o,u))}return en.waitFor(s)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return X.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):tm(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(i=>{let s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):en.resolve(tk()),a=-1,o=i;return s.next(t=>en.forEach(t,(t,n)=>(a<n.largestBatchId&&(a=n.largestBatchId),i.get(t)?en.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{o=o.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,o,t,tR())).next(e=>({batchId:a,changes:tb(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new X(t)).next(e=>{let t=tN();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){let i=t.collectionGroup,s=tN();return this.indexManager.getCollectionParents(e,i).next(a=>en.forEach(a,a=>{let o=new td(a.child(i),null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt);return this.getDocumentsMatchingCollectionQuery(e,o,n,r).next(e=>{e.forEach((e,t)=>{s=s.insert(e,t)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,n,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,r))).next(e=>{i.forEach((t,n)=>{let r=n.getKey();null===e.get(r)&&(e=e.insert(r,eZ.newInvalidDocument(r)))});let n=tN();return e.forEach((e,r)=>{let s=i.get(e);void 0!==s&&tJ(s.mutation,r,em.empty(),K.now()),tT(t,r)&&(n=n.insert(e,r))}),n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nJ{constructor(e){this.serializer=e,this.Fr=new Map,this.Mr=new Map}getBundleMetadata(e,t){return en.resolve(this.Fr.get(t))}saveBundleMetadata(e,t){return this.Fr.set(t.id,{id:t.id,version:t.version,createTime:nI(t.createTime)}),en.resolve()}getNamedQuery(e,t){return en.resolve(this.Mr.get(t))}saveNamedQuery(e,t){return this.Mr.set(t.name,{name:t.name,query:function(e){let t=function(e){var t;let n,r=function(e){let t=nA(e);return 4===t.length?W.emptyPath():nx(t)}(e.parent),i=e.structuredQuery,s=i.from?i.from.length:0,a=null;if(s>0){A(1===s,65062);let e=i.from[0];e.allDescendants?a=e.collectionId:r=r.child(e.collectionId)}let o=[];i.where&&(o=function(e){var t;let n=function e(t){return void 0!==t.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=nV(e.unaryFilter.field);return e9.create(t,"==",{doubleValue:NaN});case"IS_NULL":let n=nV(e.unaryFilter.field);return e9.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let r=nV(e.unaryFilter.field);return e9.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let i=nV(e.unaryFilter.field);return e9.create(i,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return C(61313);default:return C(60726)}}(t):void 0!==t.fieldFilter?e9.create(nV(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return C(58110);default:return C(50506)}}(t.fieldFilter.op),t.fieldFilter.value):void 0!==t.compositeFilter?e6.create(t.compositeFilter.filters.map(t=>e(t)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return C(1026)}}(t.compositeFilter.op)):C(30097,{filter:t})}(e);return n instanceof e6&&e8(t=n)&&e5(t)?n.getFilters():[n]}(i.where));let l=[];i.orderBy&&(l=i.orderBy.map(e=>new e3(nV(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))));let u=null;i.limit&&(u=null==(n="object"==typeof(t=i.limit)?t.value:t)?null:n);let h=null;i.startAt&&(h=function(e){let t=!!e.before;return new e0(e.values||[],t)}(i.startAt));let c=null;return i.endAt&&(c=function(e){let t=!e.before;return new e0(e.values||[],t)}(i.endAt)),new td(r,a,l,o,u,"F",h,c)}({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?tv(t,t.limit,"L"):t}(t.bundledQuery),readTime:nI(t.readTime)}),en.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nZ{constructor(){this.overlays=new eu(X.comparator),this.Or=new Map}getOverlay(e,t){return en.resolve(this.overlays.get(t))}getOverlays(e,t){let n=tk();return en.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.St(e,t,r)}),en.resolve()}removeOverlaysForBatchId(e,t,n){let r=this.Or.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.Or.delete(n)),en.resolve()}getOverlaysForCollection(e,t,n){let r=tk(),i=t.length+1,s=new X(t.child("")),a=this.overlays.getIteratorFrom(s);for(;a.hasNext();){let e=a.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>n&&r.set(e.getKey(),e)}return en.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new eu((e,t)=>e-t),s=this.overlays.getIterator();for(;s.hasNext();){let e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=tk(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}let a=tk(),o=i.getIterator();for(;o.hasNext()&&(o.getNext().value.forEach((e,t)=>a.set(e,t)),!(a.size()>=r)););return en.resolve(a)}St(e,t,n){let r=this.overlays.get(n.key);if(null!==r){let e=this.Or.get(r.largestBatchId).delete(n.key);this.Or.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new t7(t,n));let i=this.Or.get(t);void 0===i&&(i=tR(),this.Or.set(t,i)),this.Or.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n0{constructor(){this.sessionToken=ep.EMPTY_BYTE_STRING}getSessionToken(e){return en.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,en.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n1{constructor(){this.Nr=new ed(n2.Br),this.Lr=new ed(n2.kr)}isEmpty(){return this.Nr.isEmpty()}addReference(e,t){let n=new n2(e,t);this.Nr=this.Nr.add(n),this.Lr=this.Lr.add(n)}qr(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Qr(new n2(e,t))}$r(e,t){e.forEach(e=>this.removeReference(e,t))}Ur(e){let t=new X(new W([])),n=new n2(t,e),r=new n2(t,e+1),i=[];return this.Lr.forEachInRange([n,r],e=>{this.Qr(e),i.push(e.key)}),i}Kr(){this.Nr.forEach(e=>this.Qr(e))}Qr(e){this.Nr=this.Nr.delete(e),this.Lr=this.Lr.delete(e)}Wr(e){let t=new X(new W([])),n=new n2(t,e),r=new n2(t,e+1),i=tR();return this.Lr.forEachInRange([n,r],e=>{i=i.add(e.key)}),i}containsKey(e){let t=new n2(e,0),n=this.Nr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class n2{constructor(e,t){this.key=e,this.Gr=t}static Br(e,t){return X.comparator(e.key,t.key)||q(e.Gr,t.Gr)}static kr(e,t){return q(e.Gr,t.Gr)||X.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n3{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Jn=1,this.zr=new ed(n2.Br)}checkEmpty(e){return en.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){let i=this.Jn;this.Jn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let s=new t5(i,t,n,r);for(let t of(this.mutationQueue.push(s),r))this.zr=this.zr.add(new n2(t.key,i)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return en.resolve(s)}lookupMutationBatch(e,t){return en.resolve(this.jr(t))}getNextMutationBatchAfterBatchId(e,t){let n=this.Hr(t+1),r=n<0?0:n;return en.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return en.resolve(0===this.mutationQueue.length?-1:this.Jn-1)}getAllMutationBatches(e){return en.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let n=new n2(t,0),r=new n2(t,Number.POSITIVE_INFINITY),i=[];return this.zr.forEachInRange([n,r],e=>{let t=this.jr(e.Gr);i.push(t)}),en.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ed(q);return t.forEach(e=>{let t=new n2(e,0),r=new n2(e,Number.POSITIVE_INFINITY);this.zr.forEachInRange([t,r],e=>{n=n.add(e.Gr)})}),en.resolve(this.Jr(n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,r=n.length+1,i=n;X.isDocumentKey(i)||(i=i.child(""));let s=new n2(new X(i),0),a=new ed(q);return this.zr.forEachWhile(e=>{let t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(a=a.add(e.Gr)),!0)},s),en.resolve(this.Jr(a))}Jr(e){let t=[];return e.forEach(e=>{let n=this.jr(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){A(0===this.Yr(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.zr;return en.forEach(t.mutations,r=>{let i=new n2(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.zr=n})}Xn(e){}containsKey(e,t){let n=new n2(t,0),r=this.zr.firstAfterOrEqual(n);return en.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,en.resolve()}Yr(e,t){return this.Hr(e)}Hr(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}jr(e){let t=this.Hr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n4{constructor(e){this.Zr=e,this.docs=new eu(X.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let n=t.key,r=this.docs.get(n),i=r?r.size:0,s=this.Zr(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let n=this.docs.get(t);return en.resolve(n?n.document.mutableCopy():eZ.newInvalidDocument(t))}getEntries(e,t){let n=tS;return t.forEach(e=>{let t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():eZ.newInvalidDocument(e))}),en.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let i=tS,s=t.path,a=new X(s.child("__id-9223372036854775808__")),o=this.docs.getIteratorFrom(a);for(;o.hasNext();){let{key:e,value:{document:a}}=o.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||0>=function(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:0!==(n=X.comparator(e.documentKey,t.documentKey))?n:q(e.largestBatchId,t.largestBatchId)}(new Z(a.readTime,a.key,-1),n)||(r.has(a.key)||tT(t,a))&&(i=i.insert(a.key,a.mutableCopy()))}return en.resolve(i)}getAllFromCollectionGroup(e,t,n,r){C(9500)}Xr(e,t){return en.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new n9(this)}getSize(e){return en.resolve(this.size)}}class n9 extends nH{constructor(e){super(),this.vr=e}applyChanges(e){let t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.vr.addEntry(e,r)):this.vr.removeEntry(n)}),en.waitFor(t)}getFromCache(e,t){return this.vr.getEntry(e,t)}getAllFromCache(e,t){return this.vr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n6{constructor(e){this.persistence=e,this.ei=new tC(e=>tu(e),th),this.lastRemoteSnapshotVersion=G.min(),this.highestTargetId=0,this.ti=0,this.ni=new n1,this.targetCount=0,this.ri=nB.rr()}forEachTarget(e,t){return this.ei.forEach((e,n)=>t(n)),en.resolve()}getLastRemoteSnapshotVersion(e){return en.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return en.resolve(this.ti)}allocateTargetId(e){return this.highestTargetId=this.ri.next(),en.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.ti&&(this.ti=t),en.resolve()}ar(e){this.ei.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.ri=new nB(t),this.highestTargetId=t),e.sequenceNumber>this.ti&&(this.ti=e.sequenceNumber)}addTargetData(e,t){return this.ar(t),this.targetCount+=1,en.resolve()}updateTargetData(e,t){return this.ar(t),en.resolve()}removeTargetData(e,t){return this.ei.delete(t.target),this.ni.Ur(t.targetId),this.targetCount-=1,en.resolve()}removeTargets(e,t,n){let r=0,i=[];return this.ei.forEach((s,a)=>{a.sequenceNumber<=t&&null===n.get(a.targetId)&&(this.ei.delete(s),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),r++)}),en.waitFor(i).next(()=>r)}getTargetCount(e){return en.resolve(this.targetCount)}getTargetData(e,t){let n=this.ei.get(t)||null;return en.resolve(n)}addMatchingKeys(e,t,n){return this.ni.qr(t,n),en.resolve()}removeMatchingKeys(e,t,n){this.ni.$r(t,n);let r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(t=>{i.push(r.markPotentiallyOrphaned(e,t))}),en.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.ni.Ur(t),en.resolve()}getMatchingKeysForTargetId(e,t){let n=this.ni.Wr(t);return en.resolve(n)}containsKey(e,t){return en.resolve(this.ni.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n5{constructor(e,t){this.ii={},this.overlays={},this.si=new ei(0),this.oi=!1,this.oi=!0,this._i=new n0,this.referenceDelegate=e(this),this.ai=new n6(this),this.indexManager=new nU,this.remoteDocumentCache=new n4(e=>this.referenceDelegate.ui(e)),this.serializer=new nF(t),this.ci=new nJ(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.oi=!1,Promise.resolve()}get started(){return this.oi}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new nZ,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.ii[e.toKey()];return n||(n=new n3(t,this.referenceDelegate),this.ii[e.toKey()]=n),n}getGlobalsCache(){return this._i}getTargetCache(){return this.ai}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.ci}runTransaction(e,t,n){_("MemoryPersistence","Starting transaction:",e);let r=new n8(this.si.next());return this.referenceDelegate.li(),n(r).next(e=>this.referenceDelegate.hi(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Pi(e,t){return en.or(Object.values(this.ii).map(n=>()=>n.containsKey(e,t)))}}class n8 extends ee{constructor(e){super(),this.currentSequenceNumber=e}}class n7{constructor(e){this.persistence=e,this.Ti=new n1,this.Ii=null}static Ei(e){return new n7(e)}get di(){if(this.Ii)return this.Ii;throw C(60996)}addReference(e,t,n){return this.Ti.addReference(n,t),this.di.delete(n.toString()),en.resolve()}removeReference(e,t,n){return this.Ti.removeReference(n,t),this.di.add(n.toString()),en.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),en.resolve()}removeTarget(e,t){this.Ti.Ur(t.targetId).forEach(e=>this.di.add(e.toString()));let n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.di.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}li(){this.Ii=new Set}hi(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return en.forEach(this.di,n=>{let r=X.fromPath(n);return this.Ai(e,r).next(e=>{e||t.removeEntry(r,G.min())})}).next(()=>(this.Ii=null,t.apply(e)))}updateLimboDocument(e,t){return this.Ai(e,t).next(e=>{e?this.di.delete(t.toString()):this.di.add(t.toString())})}ui(e){return 0}Ai(e,t){return en.or([()=>en.resolve(this.Ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Pi(e,t)])}}class re{constructor(e,t){this.persistence=e,this.Ri=new tC(e=>(function(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t+="\x01\x01"),t=function(e,t){let n=t,r=e.length;for(let t=0;t<r;t++){let r=e.charAt(t);switch(r){case"\x00":n+="\x01\x10";break;case"\x01":n+="\x01\x11";break;default:n+=r}}return n}(e.get(n),t);return t+"\x01\x01"})(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=new nW(this,t)}static Ei(e,t){return new re(e,t)}li(){}hi(e){return en.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){let t=this.Vr(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}Vr(e){let t=0;return this.Ar(e,e=>{t++}).next(()=>t)}Ar(e,t){return en.forEach(this.Ri,(n,r)=>this.gr(e,n,r).next(e=>e?en.resolve():t(r)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0,r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.Xr(e,r=>this.gr(e,r,t).next(e=>{e||(n++,i.removeEntry(r,G.min()))})).next(()=>i.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.Ri.set(t,e.currentSequenceNumber),en.resolve()}removeTarget(e,t){let n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.Ri.set(n,e.currentSequenceNumber),en.resolve()}removeReference(e,t,n){return this.Ri.set(n,e.currentSequenceNumber),en.resolve()}updateLimboDocument(e,t){return this.Ri.set(t,e.currentSequenceNumber),en.resolve()}ui(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=function e(t){switch(eO(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let n=eA(t);return n?16+e(n):16;case 5:return 2*t.stringValue.length;case 6:return e_(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(t.arrayValue.values||[]).reduce((t,n)=>t+e(n),0);case 10:case 11:var r;let i;return r=t.mapValue,i=0,eo(r.fields,(t,n)=>{i+=t.length+e(n)}),i;default:throw C(13486,{value:t})}}(e.data.value)),t}gr(e,t,n){return en.or([()=>this.persistence.Pi(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let e=this.Ri.get(t);return en.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.ls=n,this.hs=r}static Ps(e,t){let n=tR(),r=tR();for(let e of t.docChanges)switch(e.type){case 0:n=n.add(e.doc.key);break;case 1:r=r.add(e.doc.key)}return new rt(e,t.fromCache,n,r)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(){this.Ts=!1,this.Is=!1,this.Es=100,this.ds=(0,h.G6)()?8:function(e){let t=e.match(/Android ([\d.]+)/i);return Number(t?t[1].split(".").slice(0,2).join("."):"-1")}((0,h.z$)())>0?6:4}initialize(e,t){this.As=e,this.indexManager=t,this.Ts=!0}getDocumentsMatchingQuery(e,t,n,r){let i={result:null};return this.Rs(e,t).next(e=>{i.result=e}).next(()=>{if(!i.result)return this.Vs(e,t,r,n).next(e=>{i.result=e})}).next(()=>{if(i.result)return;let n=new rn;return this.fs(e,t,n).next(r=>{if(i.result=r,this.Is)return this.gs(e,t,n,r.size)})}).next(()=>i.result)}gs(e,t,n,r){return n.documentReadCount<this.Es?(w()<=u.in.DEBUG&&_("QueryEngine","SDK will not create cache indexes for query:",tE(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Es,"documents"),en.resolve()):(w()<=u.in.DEBUG&&_("QueryEngine","Query:",tE(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.ds*r?(w()<=u.in.DEBUG&&_("QueryEngine","The SDK decides to create cache indexes for query:",tE(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,tp(t))):en.resolve())}Rs(e,t){if(tf(t))return en.resolve(null);let n=tp(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(n=tp(t=tv(t,null,"F"))),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{let i=tR(...r);return this.As.getDocuments(e,i).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{let s=this.ps(t,r);return this.ys(t,s,i,n.readTime)?this.Rs(e,tv(t,null,"F")):this.ws(e,s,t,n)}))})))}Vs(e,t,n,r){return tf(t)||r.isEqual(G.min())?en.resolve(null):this.As.getDocuments(e,n).next(i=>{let s=this.ps(t,i);return this.ys(t,s,n,r)?en.resolve(null):(w()<=u.in.DEBUG&&_("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),tE(t)),this.ws(e,s,t,function(e,t){let n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1;return new Z(G.fromTimestamp(1e9===r?new K(n+1,0):new K(n,r)),X.empty(),-1)}(r,0)).next(e=>e))})}ps(e,t){let n=new ed(tI(e));return t.forEach((t,r)=>{tT(e,r)&&(n=n.add(r))}),n}ys(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;let i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}fs(e,t,n){return w()<=u.in.DEBUG&&_("QueryEngine","Using full collection scan to execute query:",tE(t)),this.As.getDocumentsMatchingQuery(e,t,Z.min(),n)}ws(e,t,n,r){return this.As.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ri="LocalStore";class rs{constructor(e,t,n,r){this.persistence=e,this.bs=t,this.serializer=r,this.Ss=new eu(q),this.Ds=new tC(e=>tu(e),th),this.vs=new Map,this.Cs=e.getRemoteDocumentCache(),this.ai=e.getTargetCache(),this.ci=e.getBundleCache(),this.Fs(n)}Fs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new nX(this.Cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Cs.setIndexManager(this.indexManager),this.bs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ss))}}async function ra(e,t){return await e.persistence.runTransaction("Handle user change","readonly",n=>{let r;return e.mutationQueue.getAllMutationBatches(n).next(i=>(r=i,e.Fs(t),e.mutationQueue.getAllMutationBatches(n))).next(t=>{let i=[],s=[],a=tR();for(let e of r)for(let t of(i.push(e.batchId),e.mutations))a=a.add(t.key);for(let e of t)for(let t of(s.push(e.batchId),e.mutations))a=a.add(t.key);return e.localDocuments.getDocuments(n,a).next(e=>({Ms:e,removedBatchIds:i,addedBatchIds:s}))})})}function ro(e){return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.ai.getLastRemoteSnapshotVersion(t))}async function rl(e,t,n){let r=e.Ss.get(t);try{n||await e.persistence.runTransaction("Release target",n?"readwrite":"readwrite-primary",t=>e.persistence.referenceDelegate.removeTarget(t,r))}catch(e){if(!er(e))throw e;_(ri,`Failed to update sequence numbers for target ${t}: ${e}`)}e.Ss=e.Ss.remove(t),e.Ds.delete(r.target)}function ru(e,t,n){let r=G.min(),i=tR();return e.persistence.runTransaction("Execute query","readwrite",s=>(function(e,t,n){let r=e.Ds.get(n);return void 0!==r?en.resolve(e.Ss.get(r)):e.ai.getTargetData(t,n)})(e,s,tp(t)).next(t=>{if(t)return r=t.lastLimboFreeSnapshotVersion,e.ai.getMatchingKeysForTargetId(s,t.targetId).next(e=>{i=e})}).next(()=>e.bs.getDocumentsMatchingQuery(s,t,n?r:G.min(),n?i:tR())).next(n=>{var r;let s;return r=t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2)),s=e.vs.get(r)||G.min(),n.forEach((e,t)=>{t.readTime.compareTo(s)>0&&(s=t.readTime)}),e.vs.set(r,s),{documents:n,Ns:i}}))}class rh{constructor(){this.activeTargetIds=tL}$s(e){this.activeTargetIds=this.activeTargetIds.add(e)}Us(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Qs(){return JSON.stringify({activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()})}}class rc{constructor(){this.So=new rh,this.Do={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.So.$s(e),this.Do[e]||"not-current"}updateQueryState(e,t,n){this.Do[e]=t}removeLocalQueryTarget(e){this.So.Us(e)}isLocalQueryTarget(e){return this.So.activeTargetIds.has(e)}clearQueryState(e){delete this.Do[e]}getAllActiveQueryTargets(){return this.So.activeTargetIds}isActiveQueryTarget(e){return this.So.activeTargetIds.has(e)}start(){return this.So=new rh,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{vo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rf="ConnectivityMonitor";class rm{constructor(){this.Co=()=>this.Fo(),this.Mo=()=>this.xo(),this.Oo=[],this.No()}vo(e){this.Oo.push(e)}shutdown(){window.removeEventListener("online",this.Co),window.removeEventListener("offline",this.Mo)}No(){window.addEventListener("online",this.Co),window.addEventListener("offline",this.Mo)}Fo(){for(let e of(_(rf,"Network connectivity changed: AVAILABLE"),this.Oo))e(0)}xo(){for(let e of(_(rf,"Network connectivity changed: UNAVAILABLE"),this.Oo))e(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rg=null;function rp(){return null===rg?rg=268435456+Math.round(2147483648*Math.random()):rg++,"0x"+rg.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ry="RestConnection",rv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class rw{get Bo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Lo=t+"://"+e.host,this.ko=`projects/${n}/databases/${r}`,this.qo=this.databaseId.database===ek?`project_id=${n}`:`project_id=${n}&database_id=${r}`}Qo(e,t,n,r,i){let s=rp(),a=this.$o(e,t.toUriEncodedString());_(ry,`Sending RPC '${e}' ${s}:`,a,n);let o={"google-cloud-resource-prefix":this.ko,"x-goog-request-params":this.qo};return this.Uo(o,r,i),this.Ko(e,a,o,n).then(t=>(_(ry,`Received RPC '${e}' ${s}: `,t),t),t=>{throw T(ry,`RPC '${e}' ${s} failed with error: `,t,"url: ",a,"request:",n),t})}Wo(e,t,n,r,i,s){return this.Qo(e,t,n,r,i)}Uo(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+y,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}$o(e,t){let n=rv[e];return`${this.Lo}/v1/${t}:${n}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_{constructor(e){this.Go=e.Go,this.zo=e.zo}jo(e){this.Ho=e}Jo(e){this.Yo=e}Zo(e){this.Xo=e}onMessage(e){this.e_=e}close(){this.zo()}send(e){this.Go(e)}t_(){this.Ho()}n_(){this.Yo()}r_(e){this.Xo(e)}i_(e){this.e_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rE="WebChannelConnection";class rT extends rw{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Ko(e,t,n,r){let i=rp();return new Promise((s,a)=>{let o=new d.JJ;o.setWithCredentials(!0),o.listenOnce(d.tw.COMPLETE,()=>{try{switch(o.getLastErrorCode()){case d.jK.NO_ERROR:let t=o.getResponseJson();_(rE,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),s(t);break;case d.jK.TIMEOUT:_(rE,`RPC '${e}' ${i} timed out`),a(new b(N.DEADLINE_EXCEEDED,"Request time out"));break;case d.jK.HTTP_ERROR:let n=o.getStatus();if(_(rE,`RPC '${e}' ${i} failed with status:`,n,"response text:",o.getResponseText()),n>0){let e=o.getResponseJson();Array.isArray(e)&&(e=e[0]);let t=null==e?void 0:e.error;if(t&&t.status&&t.message){let e=function(e){let t=e.toLowerCase().replace(/_/g,"-");return Object.values(N).indexOf(t)>=0?t:N.UNKNOWN}(t.status);a(new b(e,t.message))}else a(new b(N.UNKNOWN,"Server responded with status "+o.getStatus()))}else a(new b(N.UNAVAILABLE,"Connection failed."));break;default:C(9055,{s_:e,streamId:i,o_:o.getLastErrorCode(),__:o.getLastError()})}}finally{_(rE,`RPC '${e}' ${i} completed.`)}});let l=JSON.stringify(r);_(rE,`RPC '${e}' ${i} sending request:`,r),o.send(t,"POST",l,n,15)})}a_(e,t,n){let i=rp(),s=[this.Lo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=(0,d.UE)(),o=(0,d.FJ)(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;void 0!==u&&(l.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Uo(l.initMessageHeaders,t,n),l.encodeInitMessageHeaders=!0;let h=s.join("");_(rE,`Creating RPC '${e}' stream ${i}: ${h}`,l);let c=a.createWebChannel(h,l),f=!1,m=!1,g=new r_({Go:t=>{m?_(rE,`Not sending because RPC '${e}' stream ${i} is closed:`,t):(f||(_(rE,`Opening RPC '${e}' stream ${i} transport.`),c.open(),f=!0),_(rE,`RPC '${e}' stream ${i} sending:`,t),c.send(t))},zo:()=>c.close()}),p=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(e){setTimeout(()=>{throw e},0)}})};return p(c,d.ii.EventType.OPEN,()=>{m||(_(rE,`RPC '${e}' stream ${i} transport opened.`),g.t_())}),p(c,d.ii.EventType.CLOSE,()=>{m||(m=!0,_(rE,`RPC '${e}' stream ${i} transport closed`),g.r_())}),p(c,d.ii.EventType.ERROR,t=>{m||(m=!0,T(rE,`RPC '${e}' stream ${i} transport errored. Name:`,t.name,"Message:",t.message),g.r_(new b(N.UNAVAILABLE,"The operation could not be completed")))}),p(c,d.ii.EventType.MESSAGE,t=>{var n;if(!m){let s=t.data[0];A(!!s,16349);let a=(null==s?void 0:s.error)||(null===(n=s[0])||void 0===n?void 0:n.error);if(a){_(rE,`RPC '${e}' stream ${i} received error:`,a);let t=a.status,n=function(e){let t=r[e];if(void 0!==t)return nt(t)}(t),s=a.message;void 0===n&&(n=N.INTERNAL,s="Unknown error status: "+t+" with message "+a.message),m=!0,g.r_(new b(n,s)),c.close()}else _(rE,`RPC '${e}' stream ${i} received:`,s),g.i_(s)}}),p(o,d.ju.STAT_EVENT,t=>{t.stat===d.kN.PROXY?_(rE,`RPC '${e}' stream ${i} detected buffering proxy`):t.stat===d.kN.NOPROXY&&_(rE,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{g.n_()},0),g}}function rI(){return"undefined"!=typeof document?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rC(e){return new nw(e,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rS{constructor(e,t,n=1e3,r=1.5,i=6e4){this.bi=e,this.timerId=t,this.u_=n,this.c_=r,this.l_=i,this.h_=0,this.P_=null,this.T_=Date.now(),this.reset()}reset(){this.h_=0}I_(){this.h_=this.l_}E_(e){this.cancel();let t=Math.floor(this.h_+this.d_()),n=Math.max(0,Date.now()-this.T_),r=Math.max(0,t-n);r>0&&_("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.h_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.P_=this.bi.enqueueAfterDelay(this.timerId,r,()=>(this.T_=Date.now(),e())),this.h_*=this.c_,this.h_<this.u_&&(this.h_=this.u_),this.h_>this.l_&&(this.h_=this.l_)}A_(){null!==this.P_&&(this.P_.skipDelay(),this.P_=null)}cancel(){null!==this.P_&&(this.P_.cancel(),this.P_=null)}d_(){return(Math.random()-.5)*this.h_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rA="PersistentStream";class rN{constructor(e,t,n,r,i,s,a,o){this.bi=e,this.R_=n,this.V_=r,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.m_=0,this.f_=null,this.g_=null,this.stream=null,this.p_=0,this.y_=new rS(e,t)}w_(){return 1===this.state||5===this.state||this.b_()}b_(){return 2===this.state||3===this.state}start(){this.p_=0,4!==this.state?this.auth():this.S_()}async stop(){this.w_()&&await this.close(0)}D_(){this.state=0,this.y_.reset()}v_(){this.b_()&&null===this.f_&&(this.f_=this.bi.enqueueAfterDelay(this.R_,6e4,()=>this.C_()))}F_(e){this.M_(),this.stream.send(e)}async C_(){if(this.b_())return this.close(0)}M_(){this.f_&&(this.f_.cancel(),this.f_=null)}x_(){this.g_&&(this.g_.cancel(),this.g_=null)}async close(e,t){this.M_(),this.x_(),this.y_.cancel(),this.m_++,4!==e?this.y_.reset():t&&t.code===N.RESOURCE_EXHAUSTED?(E(t.toString()),E("Using maximum backoff delay to prevent overloading the backend."),this.y_.I_()):t&&t.code===N.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.O_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Zo(t)}O_(){}auth(){this.state=1;let e=this.N_(this.m_),t=this.m_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.m_===t&&this.B_(e,n)},t=>{e(()=>{let e=new b(N.UNKNOWN,"Fetching auth token failed: "+t.message);return this.L_(e)})})}B_(e,t){let n=this.N_(this.m_);this.stream=this.k_(e,t),this.stream.jo(()=>{n(()=>this.listener.jo())}),this.stream.Jo(()=>{n(()=>(this.state=2,this.g_=this.bi.enqueueAfterDelay(this.V_,1e4,()=>(this.b_()&&(this.state=3),Promise.resolve())),this.listener.Jo()))}),this.stream.Zo(e=>{n(()=>this.L_(e))}),this.stream.onMessage(e=>{n(()=>1==++this.p_?this.q_(e):this.onNext(e))})}S_(){this.state=5,this.y_.E_(async()=>{this.state=0,this.start()})}L_(e){return _(rA,`close with error: ${e}`),this.stream=null,this.close(4,e)}N_(e){return t=>{this.bi.enqueueAndForget(()=>this.m_===e?t():(_(rA,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class rb extends rN{constructor(e,t,n,r,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}k_(e,t){return this.connection.a_("Listen",e,t)}q_(e){return this.onNext(e)}onNext(e){this.y_.reset();let t=function(e,t){let n;if("targetChange"in t){var r,i;t.targetChange;let s="NO_CHANGE"===(r=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===r?1:"REMOVE"===r?2:"CURRENT"===r?3:"RESET"===r?4:C(39313,{state:r}),a=t.targetChange.targetIds||[],o=(i=t.targetChange.resumeToken,e.useProto3Json?(A(void 0===i||"string"==typeof i,58123),ep.fromBase64String(i||"")):(A(void 0===i||i instanceof f||i instanceof Uint8Array,16193),ep.fromUint8Array(i||new Uint8Array))),l=t.targetChange.cause;n=new nc(s,a,o,l&&new b(void 0===l.code?N.UNKNOWN:nt(l.code),l.message||"")||null)}else if("documentChange"in t){t.documentChange;let r=t.documentChange;r.document,r.document.name,r.document.updateTime;let i=nb(e,r.document.name),s=nI(r.document.updateTime),a=r.document.createTime?nI(r.document.createTime):G.min(),o=new eJ({mapValue:{fields:r.document.fields}}),l=eZ.newFoundDocument(i,s,a,o);n=new nu(r.targetIds||[],r.removedTargetIds||[],l.key,l)}else if("documentDelete"in t){t.documentDelete;let r=t.documentDelete;r.document;let i=nb(e,r.document),s=r.readTime?nI(r.readTime):G.min(),a=eZ.newNoDocument(i,s);n=new nu([],r.removedTargetIds||[],a.key,a)}else if("documentRemove"in t){t.documentRemove;let r=t.documentRemove;r.document;let i=nb(e,r.document);n=new nu([],r.removedTargetIds||[],i,null)}else{if(!("filter"in t))return C(11601,{Vt:t});{t.filter;let e=t.filter;e.targetId;let{count:r=0,unchangedNames:i}=e,s=new ne(r,i);n=new nh(e.targetId,s)}}return n}(this.serializer,e),n=function(e){if(!("targetChange"in e))return G.min();let t=e.targetChange;return t.targetIds&&t.targetIds.length?G.min():t.readTime?nI(t.readTime):G.min()}(e);return this.listener.Q_(t,n)}U_(e){let t={};t.database=nD(this.serializer),t.addTarget=function(e,t){let n;let r=t.target;if((n=tc(r)?{documents:{documents:[nk(e,r.path)]}}:{query:function(e,t){var n,r;let i;let s={structuredQuery:{}},a=t.path;null!==t.collectionGroup?(i=a,s.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=a.popLast(),s.structuredQuery.from=[{collectionId:a.lastSegment()}]),s.parent=nk(e,i);let o=function(e){if(0!==e.length)return function e(t){return t instanceof e9?function(e){if("=="===e.op){if(ej(e.value))return{unaryFilter:{field:nL(e.field),op:"IS_NAN"}};if(eQ(e.value))return{unaryFilter:{field:nL(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(ej(e.value))return{unaryFilter:{field:nL(e.field),op:"IS_NOT_NAN"}};if(eQ(e.value))return{unaryFilter:{field:nL(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:nL(e.field),op:ny[e.op],value:e.value}}}(t):t instanceof e6?function(t){let n=t.getFilters().map(t=>e(t));return 1===n.length?n[0]:{compositeFilter:{op:nv[t.op],filters:n}}}(t):C(54877,{filter:t})}(e6.create(e,"and"))}(t.filters);o&&(s.structuredQuery.where=o);let l=function(e){if(0!==e.length)return e.map(e=>({field:nL(e.field),direction:np[e.dir]}))}(t.orderBy);l&&(s.structuredQuery.orderBy=l);let u=n_(e,t.limit);return null!==u&&(s.structuredQuery.limit=u),t.startAt&&(s.structuredQuery.startAt={before:(n=t.startAt).inclusive,values:n.position}),t.endAt&&(s.structuredQuery.endAt={before:!(r=t.endAt).inclusive,values:r.position}),{gt:s,parent:i}}(e,r).gt}).targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=nT(e,t.resumeToken);let r=n_(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(G.min())>0){n.readTime=nE(e,t.snapshotVersion.toTimestamp());let r=n_(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);let n=function(e,t){let n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return C(28987,{purpose:e})}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,e);n&&(t.labels=n),this.F_(t)}K_(e){let t={};t.database=nD(this.serializer),t.removeTarget=e,this.F_(t)}}class rk extends rN{constructor(e,t,n,r,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}get W_(){return this.p_>0}start(){this.lastStreamToken=void 0,super.start()}O_(){this.W_&&this.G_([])}k_(e,t){return this.connection.a_("Write",e,t)}q_(e){return A(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,A(!e.writeResults||0===e.writeResults.length,55816),this.listener.z_()}onNext(e){var t,n;A(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.y_.reset();let r=(t=e.writeResults,n=e.commitTime,t&&t.length>0?(A(void 0!==n,14353),t.map(e=>{let t;return(t=e.updateTime?nI(e.updateTime):nI(n)).isEqual(G.min())&&(t=nI(n)),new tj(t,e.transformResults||[])})):[]),i=nI(e.commitTime);return this.listener.j_(i,r)}H_(){let e={};e.database=nD(this.serializer),this.F_(e)}G_(e){let t={streamToken:this.lastStreamToken,writes:e.map(e=>(function(e,t){var n;let r;if(t instanceof t0)r={update:nR(e,t.key,t.value)};else if(t instanceof t9)r={delete:nN(e,t.key)};else if(t instanceof t1)r={update:nR(e,t.key,t.data),updateMask:function(e){let t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}(t.fieldMask)};else{if(!(t instanceof t6))return C(16599,{ft:t.type});r={verify:nN(e,t.key)}}return t.fieldTransforms.length>0&&(r.updateTransforms=t.fieldTransforms.map(e=>(function(e,t){let n=t.transform;if(n instanceof tP)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof tU)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof t$)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof tB)return{fieldPath:t.field.canonicalString(),increment:n.Re};throw C(20930,{transform:t.transform})})(0,e))),t.precondition.isNone||(r.currentDocument=void 0!==(n=t.precondition).updateTime?{updateTime:nE(e,n.updateTime.toTimestamp())}:void 0!==n.exists?{exists:n.exists}:C(27497)),r})(this.serializer,e))};this.F_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rD{}class rx extends rD{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.J_=!1}Y_(){if(this.J_)throw new b(N.FAILED_PRECONDITION,"The client has already been terminated.")}Qo(e,t,n,r){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.Qo(e,nS(t,n),r,i,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new b(N.UNKNOWN,e.toString())})}Wo(e,t,n,r,i){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Wo(e,nS(t,n),r,s,a,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new b(N.UNKNOWN,e.toString())})}terminate(){this.J_=!0,this.connection.terminate()}}class rR{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Z_=0,this.X_=null,this.ea=!0}ta(){0===this.Z_&&(this.na("Unknown"),this.X_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.X_=null,this.ra("Backend didn't respond within 10 seconds."),this.na("Offline"),Promise.resolve())))}ia(e){"Online"===this.state?this.na("Unknown"):(this.Z_++,this.Z_>=1&&(this.sa(),this.ra(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.na("Offline")))}set(e){this.sa(),this.Z_=0,"Online"===e&&(this.ea=!1),this.na(e)}na(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ra(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ea?(E(t),this.ea=!1):_("OnlineStateTracker",t)}sa(){null!==this.X_&&(this.X_.cancel(),this.X_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rL="RemoteStore";class rV{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.oa=[],this._a=new Map,this.aa=new Set,this.ua=[],this.ca=i,this.ca.vo(e=>{n.enqueueAndForget(async()=>{rB(this)&&(_(rL,"Restarting streams for network reachability change."),await async function(e){e.aa.add(4),await rO(e),e.la.set("Unknown"),e.aa.delete(4),await rM(e)}(this))})}),this.la=new rR(n,r)}}async function rM(e){if(rB(e))for(let t of e.ua)await t(!0)}async function rO(e){for(let t of e.ua)await t(!1)}function rF(e,t){e._a.has(t.targetId)||(e._a.set(t.targetId,t),rz(e)?r$(e):r9(e).b_()&&rU(e,t))}function rP(e,t){let n=r9(e);e._a.delete(t),n.b_()&&rq(e,t),0===e._a.size&&(n.b_()?n.v_():rB(e)&&e.la.set("Unknown"))}function rU(e,t){if(e.ha.Ke(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(G.min())>0){let n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}r9(e).U_(t)}function rq(e,t){e.ha.Ke(t),r9(e).K_(t)}function r$(e){e.ha=new nf({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),Rt:t=>e._a.get(t)||null,Pt:()=>e.datastore.serializer.databaseId}),r9(e).start(),e.la.ta()}function rz(e){return rB(e)&&!r9(e).w_()&&e._a.size>0}function rB(e){return 0===e.aa.size}async function rK(e){e.la.set("Online")}async function rG(e){e._a.forEach((t,n)=>{rU(e,t)})}async function rQ(e,t){e.ha=void 0,rz(e)?(e.la.ia(t),r$(e)):e.la.set("Unknown")}async function rj(e,t,n){if(e.la.set("Online"),t instanceof nc&&2===t.state&&t.cause)try{await async function(e,t){let n=t.cause;for(let r of t.targetIds)e._a.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e._a.delete(r),e.ha.removeTarget(r))}(e,t)}catch(n){_(rL,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await rW(e,n)}else if(t instanceof nu?e.ha.Xe(t):t instanceof nh?e.ha.ot(t):e.ha.nt(t),!n.isEqual(G.min()))try{let t=await ro(e.localStore);n.compareTo(t)>=0&&await function(e,t){let n=e.ha.It(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){let i=e._a.get(r);i&&e._a.set(r,i.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{let r=e._a.get(t);if(!r)return;e._a.set(t,r.withResumeToken(ep.EMPTY_BYTE_STRING,r.snapshotVersion)),rq(e,t);let i=new nO(r.target,t,n,r.sequenceNumber);rU(e,i)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){_(rL,"Failed to raise snapshot:",t),await rW(e,t)}}async function rW(e,t,n){if(!er(t))throw t;e.aa.add(1),await rO(e),e.la.set("Offline"),n||(n=()=>ro(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{_(rL,"Retrying IndexedDB access"),await n(),e.aa.delete(1),await rM(e)})}function rH(e,t){return t().catch(n=>rW(e,n,t))}async function rY(e){let t=r6(e),n=e.oa.length>0?e.oa[e.oa.length-1].batchId:-1;for(;rB(e)&&e.oa.length<10;)try{let r=await function(e,t){return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(void 0===t&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}(e.localStore,n);if(null===r){0===e.oa.length&&t.v_();break}n=r.batchId,function(e,t){e.oa.push(t);let n=r6(e);n.b_()&&n.W_&&n.G_(t.mutations)}(e,r)}catch(t){await rW(e,t)}rX(e)&&rJ(e)}function rX(e){return rB(e)&&!r6(e).w_()&&e.oa.length>0}function rJ(e){r6(e).start()}async function rZ(e){r6(e).H_()}async function r0(e){let t=r6(e);for(let n of e.oa)t.G_(n.mutations)}async function r1(e,t,n){let r=e.oa.shift(),i=t8.from(r,t,n);await rH(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await rY(e)}async function r2(e,t){t&&r6(e).W_&&await async function(e,t){var n;if(function(e){switch(e){case N.OK:return C(64938);case N.CANCELLED:case N.UNKNOWN:case N.DEADLINE_EXCEEDED:case N.RESOURCE_EXHAUSTED:case N.INTERNAL:case N.UNAVAILABLE:case N.UNAUTHENTICATED:return!1;case N.INVALID_ARGUMENT:case N.NOT_FOUND:case N.ALREADY_EXISTS:case N.PERMISSION_DENIED:case N.FAILED_PRECONDITION:case N.ABORTED:case N.OUT_OF_RANGE:case N.UNIMPLEMENTED:case N.DATA_LOSS:return!0;default:return C(15467,{code:e})}}(n=t.code)&&n!==N.ABORTED){let n=e.oa.shift();r6(e).D_(),await rH(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await rY(e)}}(e,t),rX(e)&&rJ(e)}async function r3(e,t){e.asyncQueue.verifyOperationInProgress(),_(rL,"RemoteStore received new credentials");let n=rB(e);e.aa.add(3),await rO(e),n&&e.la.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.aa.delete(3),await rM(e)}async function r4(e,t){t?(e.aa.delete(2),await rM(e)):t||(e.aa.add(2),await rO(e),e.la.set("Unknown"))}function r9(e){var t,n,r;return e.Pa||(e.Pa=(t=e.datastore,n=e.asyncQueue,r={jo:rK.bind(null,e),Jo:rG.bind(null,e),Zo:rQ.bind(null,e),Q_:rj.bind(null,e)},t.Y_(),new rb(n,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,r)),e.ua.push(async t=>{t?(e.Pa.D_(),rz(e)?r$(e):e.la.set("Unknown")):(await e.Pa.stop(),e.ha=void 0)})),e.Pa}function r6(e){var t,n,r;return e.Ta||(e.Ta=(t=e.datastore,n=e.asyncQueue,r={jo:()=>Promise.resolve(),Jo:rZ.bind(null,e),Zo:r2.bind(null,e),z_:r0.bind(null,e),j_:r1.bind(null,e)},t.Y_(),new rk(n,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,r)),e.ua.push(async t=>{t?(e.Ta.D_(),await rY(e)):(await e.Ta.stop(),e.oa.length>0&&(_(rL,`Stopping write stream with ${e.oa.length} pending writes`),e.oa=[]))})),e.Ta}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r5{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new k,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,i){let s=new r5(e,t,Date.now()+n,r,i);return s.start(n),s}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new b(N.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function r8(e,t){if(E("AsyncQueue",`${t}: ${e}`),er(e))return new b(N.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r7{static emptySet(e){return new r7(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||X.comparator(t.key,n.key):(e,t)=>X.comparator(e.key,t.key),this.keyedMap=tN(),this.sortedSet=new eu(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof r7)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){let e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){let n=new r7;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(){this.Ia=new eu(X.comparator)}track(e){let t=e.doc.key,n=this.Ia.get(t);n?0!==e.type&&3===n.type?this.Ia=this.Ia.insert(t,e):3===e.type&&1!==n.type?this.Ia=this.Ia.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.Ia=this.Ia.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.Ia=this.Ia.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.Ia=this.Ia.remove(t):1===e.type&&2===n.type?this.Ia=this.Ia.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.Ia=this.Ia.insert(t,{type:2,doc:e.doc}):C(63341,{Vt:e,Ea:n}):this.Ia=this.Ia.insert(t,e)}da(){let e=[];return this.Ia.inorderTraversal((t,n)=>{e.push(n)}),e}}class it{constructor(e,t,n,r,i,s,a,o,l){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=a,this.excludesMetadataChanges=o,this.hasCachedResults=l}static fromInitialDocuments(e,t,n,r,i){let s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new it(e,t,r7.emptySet(t),s,n,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&tw(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==n[e].type||!t[e].doc.isEqual(n[e].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{constructor(){this.Aa=void 0,this.Ra=[]}Va(){return this.Ra.some(e=>e.ma())}}class ii{constructor(){this.queries=is(),this.onlineState="Unknown",this.fa=new Set}terminate(){!function(e,t){let n=e.queries;e.queries=is(),n.forEach((e,n)=>{for(let e of n.Ra)e.onError(t)})}(this,new b(N.ABORTED,"Firestore shutting down"))}}function is(){return new tC(e=>t_(e),tw)}async function ia(e,t){let n=3,r=t.query,i=e.queries.get(r);i?!i.Va()&&t.ma()&&(n=2):(i=new ir,n=t.ma()?0:1);try{switch(n){case 0:i.Aa=await e.onListen(r,!0);break;case 1:i.Aa=await e.onListen(r,!1);break;case 2:await e.onFirstRemoteStoreListen(r)}}catch(n){let e=r8(n,`Initialization of query '${tE(t.query)}' failed`);return void t.onError(e)}e.queries.set(r,i),i.Ra.push(t),t.ga(e.onlineState),i.Aa&&t.pa(i.Aa)&&ih(e)}async function io(e,t){let n=t.query,r=3,i=e.queries.get(n);if(i){let e=i.Ra.indexOf(t);e>=0&&(i.Ra.splice(e,1),0===i.Ra.length?r=t.ma()?0:1:!i.Va()&&t.ma()&&(r=2))}switch(r){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function il(e,t){let n=!1;for(let r of t){let t=r.query,i=e.queries.get(t);if(i){for(let e of i.Ra)e.pa(r)&&(n=!0);i.Aa=r}}n&&ih(e)}function iu(e,t,n){let r=e.queries.get(t);if(r)for(let e of r.Ra)e.onError(n);e.queries.delete(t)}function ih(e){e.fa.forEach(e=>{e.next()})}(a=s||(s={})).ya="default",a.Cache="cache";class ic{constructor(e,t,n){this.query=e,this.wa=t,this.ba=!1,this.Sa=null,this.onlineState="Unknown",this.options=n||{}}pa(e){if(!this.options.includeMetadataChanges){let t=[];for(let n of e.docChanges)3!==n.type&&t.push(n);e=new it(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ba?this.Da(e)&&(this.wa.next(e),t=!0):this.va(e,this.onlineState)&&(this.Ca(e),t=!0),this.Sa=e,t}onError(e){this.wa.error(e)}ga(e){this.onlineState=e;let t=!1;return this.Sa&&!this.ba&&this.va(this.Sa,e)&&(this.Ca(this.Sa),t=!0),t}va(e,t){return!(e.fromCache&&this.ma())||(!this.options.Fa||!("Offline"!==t))&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Da(e){if(e.docChanges.length>0)return!0;let t=this.Sa&&this.Sa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}Ca(e){e=it.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ba=!0,this.wa.next(e)}ma(){return this.options.source!==s.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(e){this.key=e}}class im{constructor(e){this.key=e}}class ig{constructor(e,t){this.query=e,this.qa=t,this.Qa=null,this.hasCachedResults=!1,this.current=!1,this.$a=tR(),this.mutatedKeys=tR(),this.Ua=tI(e),this.Ka=new r7(this.Ua)}get Wa(){return this.qa}Ga(e,t){let n=t?t.za:new ie,r=t?t.Ka:this.Ka,i=t?t.mutatedKeys:this.mutatedKeys,s=r,a=!1,o="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,l="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{let u=r.get(e),h=tT(this.query,t)?t:null,c=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations),f=!1;u&&h?u.data.isEqual(h.data)?c!==d&&(n.track({type:3,doc:h}),f=!0):this.ja(u,h)||(n.track({type:2,doc:h}),f=!0,(o&&this.Ua(h,o)>0||l&&0>this.Ua(h,l))&&(a=!0)):!u&&h?(n.track({type:0,doc:h}),f=!0):u&&!h&&(n.track({type:1,doc:u}),f=!0,(o||l)&&(a=!0)),f&&(h?(s=s.add(h),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){let e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{Ka:s,za:n,ys:a,mutatedKeys:i}}ja(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){let i=this.Ka;this.Ka=e.Ka,this.mutatedKeys=e.mutatedKeys;let s=e.za.da();s.sort((e,t)=>(function(e,t){let n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return C(20277,{Vt:e})}};return n(e)-n(t)})(e.type,t.type)||this.Ua(e.doc,t.doc)),this.Ha(n),r=null!=r&&r;let a=t&&!r?this.Ja():[],o=0===this.$a.size&&this.current&&!r?1:0,l=o!==this.Qa;return(this.Qa=o,0!==s.length||l)?{snapshot:new it(this.query,e.Ka,i,s,e.mutatedKeys,0===o,l,!1,!!n&&n.resumeToken.approximateByteSize()>0),Ya:a}:{Ya:a}}ga(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Ka:this.Ka,za:new ie,mutatedKeys:this.mutatedKeys,ys:!1},!1)):{Ya:[]}}Za(e){return!this.qa.has(e)&&!!this.Ka.has(e)&&!this.Ka.get(e).hasLocalMutations}Ha(e){e&&(e.addedDocuments.forEach(e=>this.qa=this.qa.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.qa=this.qa.delete(e)),this.current=e.current)}Ja(){if(!this.current)return[];let e=this.$a;this.$a=tR(),this.Ka.forEach(e=>{this.Za(e.key)&&(this.$a=this.$a.add(e.key))});let t=[];return e.forEach(e=>{this.$a.has(e)||t.push(new im(e))}),this.$a.forEach(n=>{e.has(n)||t.push(new id(n))}),t}Xa(e){this.qa=e.Ns,this.$a=tR();let t=this.Ga(e.documents);return this.applyChanges(t,!0)}eu(){return it.fromInitialDocuments(this.query,this.Ka,this.mutatedKeys,0===this.Qa,this.hasCachedResults)}}let ip="SyncEngine";class iy{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class iv{constructor(e){this.key=e,this.tu=!1}}class iw{constructor(e,t,n,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.nu={},this.ru=new tC(e=>t_(e),tw),this.iu=new Map,this.su=new Set,this.ou=new eu(X.comparator),this._u=new Map,this.au=new n1,this.uu={},this.cu=new Map,this.lu=nB.ir(),this.onlineState="Unknown",this.hu=void 0}get isPrimaryClient(){return!0===this.hu}}async function i_(e,t,n=!0){let r;let i=i$(e),s=i.ru.get(t);return s?(i.sharedClientState.addLocalQueryTarget(s.targetId),r=s.view.eu()):r=await iT(i,t,n,!0),r}async function iE(e,t){let n=i$(e);await iT(n,t,!0,!1)}async function iT(e,t,n,r){var i,s;let a;let o=await (i=e.localStore,s=tp(t),i.persistence.runTransaction("Allocate target","readwrite",e=>{let t;return i.ai.getTargetData(e,s).next(n=>n?(t=n,en.resolve(t)):i.ai.allocateTargetId(e).next(n=>(t=new nO(s,n,"TargetPurposeListen",e.currentSequenceNumber),i.ai.addTargetData(e,t).next(()=>t))))}).then(e=>{let t=i.Ss.get(e.targetId);return(null===t||e.snapshotVersion.compareTo(t.snapshotVersion)>0)&&(i.Ss=i.Ss.insert(e.targetId,e),i.Ds.set(s,e.targetId)),e})),l=o.targetId,u=e.sharedClientState.addLocalQueryTarget(l,n);return r&&(a=await iI(e,t,l,"current"===u,o.resumeToken)),e.isPrimaryClient&&n&&rF(e.remoteStore,o),a}async function iI(e,t,n,r,i){e.Pu=(t,n,r)=>(async function(e,t,n,r){let i=t.view.Ga(n);i.ys&&(i=await ru(e.localStore,t.query,!1).then(({documents:e})=>t.view.Ga(e,i)));let s=r&&r.targetChanges.get(t.targetId),a=r&&null!=r.targetMismatches.get(t.targetId),o=t.view.applyChanges(i,e.isPrimaryClient,s,a);return iO(e,t.targetId,o.Ya),o.snapshot})(e,t,n,r);let s=await ru(e.localStore,t,!0),a=new ig(t,s.Ns),o=a.Ga(s.documents),l=nl.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,i),u=a.applyChanges(o,e.isPrimaryClient,l);iO(e,n,u.Ya);let h=new iy(t,n,a);return e.ru.set(t,h),e.iu.has(n)?e.iu.get(n).push(t):e.iu.set(n,[t]),u.snapshot}async function iC(e,t,n){let r=e.ru.get(t),i=e.iu.get(r.targetId);if(i.length>1)return e.iu.set(r.targetId,i.filter(e=>!tw(e,t))),void e.ru.delete(t);e.isPrimaryClient?(e.sharedClientState.removeLocalQueryTarget(r.targetId),e.sharedClientState.isActiveQueryTarget(r.targetId)||await rl(e.localStore,r.targetId,!1).then(()=>{e.sharedClientState.clearQueryState(r.targetId),n&&rP(e.remoteStore,r.targetId),iV(e,r.targetId)}).catch(et)):(iV(e,r.targetId),await rl(e.localStore,r.targetId,!0))}async function iS(e,t){let n=e.ru.get(t),r=e.iu.get(n.targetId);e.isPrimaryClient&&1===r.length&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),rP(e.remoteStore,n.targetId))}async function iA(e,t,n){var r;let i=(e.remoteStore.remoteSyncer.applySuccessfulWrite=iD.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=ix.bind(null,e),e);try{let e;let s=await function(e,t){let n,r;let i=K.now(),s=t.reduce((e,t)=>e.add(t.key),tR());return e.persistence.runTransaction("Locally write mutations","readwrite",a=>{let o=tS,l=tR();return e.Cs.getEntries(a,s).next(e=>{(o=e).forEach((e,t)=>{t.isValidDocument()||(l=l.add(e))})}).next(()=>e.localDocuments.getOverlayedDocuments(a,o)).next(r=>{n=r;let s=[];for(let e of t){let t=function(e,t){let n=null;for(let r of e.fieldTransforms){let e=t.data.field(r.field),i=tF(r.transform,e||null);null!=i&&(null===n&&(n=eJ.empty()),n.set(r.field,i))}return n||null}(e,n.get(e.key).overlayedDocument);null!=t&&s.push(new t1(e.key,t,function e(t){let n=[];return eo(t.fields,(t,r)=>{let i=new Y([t]);if(eW(r)){let t=e(r.mapValue).fields;if(0===t.length)n.push(i);else for(let e of t)n.push(i.child(e))}else n.push(i)}),new em(n)}(t.value.mapValue),tW.exists(!0)))}return e.mutationQueue.addMutationBatch(a,i,s,t)}).next(t=>{r=t;let i=t.applyToLocalDocumentSet(n,l);return e.documentOverlayCache.saveOverlays(a,t.batchId,i)})}).then(()=>({batchId:r.batchId,changes:tb(n)}))}(i.localStore,t);i.sharedClientState.addPendingMutation(s.batchId),r=s.batchId,(e=i.uu[i.currentUser.toKey()])||(e=new eu(q)),e=e.insert(r,n),i.uu[i.currentUser.toKey()]=e,await iP(i,s.changes),await rY(i.remoteStore)}catch(t){let e=r8(t,"Failed to persist write");n.reject(e)}}async function iN(e,t){try{let n=await function(e,t){let n=t.snapshotVersion,r=e.Ss;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{var s;let a,o;let l=e.Cs.newChangeBuffer({trackRemovals:!0});r=e.Ss;let u=[];t.targetChanges.forEach((s,a)=>{var o;let l=r.get(a);if(!l)return;u.push(e.ai.removeMatchingKeys(i,s.removedDocuments,a).next(()=>e.ai.addMatchingKeys(i,s.addedDocuments,a)));let h=l.withSequenceNumber(i.currentSequenceNumber);null!==t.targetMismatches.get(a)?h=h.withResumeToken(ep.EMPTY_BYTE_STRING,G.min()).withLastLimboFreeSnapshotVersion(G.min()):s.resumeToken.approximateByteSize()>0&&(h=h.withResumeToken(s.resumeToken,n)),r=r.insert(a,h),o=h,(0===l.resumeToken.approximateByteSize()||o.snapshotVersion.toMicroseconds()-l.snapshotVersion.toMicroseconds()>=3e8||s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size>0)&&u.push(e.ai.updateTargetData(i,h))});let h=tS,c=tR();if(t.documentUpdates.forEach(n=>{t.resolvedLimboDocuments.has(n)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,n))}),u.push((s=t.documentUpdates,a=tR(),o=tR(),s.forEach(e=>a=a.add(e)),l.getEntries(i,a).next(e=>{let t=tS;return s.forEach((n,r)=>{let i=e.get(n);r.isFoundDocument()!==i.isFoundDocument()&&(o=o.add(n)),r.isNoDocument()&&r.version.isEqual(G.min())?(l.removeEntry(n,r.readTime),t=t.insert(n,r)):!i.isValidDocument()||r.version.compareTo(i.version)>0||0===r.version.compareTo(i.version)&&i.hasPendingWrites?(l.addEntry(r),t=t.insert(n,r)):_(ri,"Ignoring outdated watch update for ",n,". Current version:",i.version," Watch version:",r.version)}),{xs:t,Os:o}})).next(e=>{h=e.xs,c=e.Os})),!n.isEqual(G.min())){let t=e.ai.getLastRemoteSnapshotVersion(i).next(t=>e.ai.setTargetsMetadata(i,i.currentSequenceNumber,n));u.push(t)}return en.waitFor(u).next(()=>l.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,h,c)).next(()=>h)}).then(t=>(e.Ss=r,t))}(e.localStore,t);t.targetChanges.forEach((t,n)=>{let r=e._u.get(n);r&&(A(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1,22616),t.addedDocuments.size>0?r.tu=!0:t.modifiedDocuments.size>0?A(r.tu,14607):t.removedDocuments.size>0&&(A(r.tu,42227),r.tu=!1))}),await iP(e,n,t)}catch(e){await et(e)}}function ib(e,t,n){var r;if(e.isPrimaryClient&&0===n||!e.isPrimaryClient&&1===n){let n;let i=[];e.ru.forEach((e,n)=>{let r=n.view.ga(t);r.snapshot&&i.push(r.snapshot)}),(r=e.eventManager).onlineState=t,n=!1,r.queries.forEach((e,r)=>{for(let e of r.Ra)e.ga(t)&&(n=!0)}),n&&ih(r),i.length&&e.nu.Q_(i),e.onlineState=t,e.isPrimaryClient&&e.sharedClientState.setOnlineState(t)}}async function ik(e,t,n){e.sharedClientState.updateQueryState(t,"rejected",n);let r=e._u.get(t),i=r&&r.key;if(i){let n=new eu(X.comparator);n=n.insert(i,eZ.newNoDocument(i,G.min()));let r=tR().add(i),s=new no(G.min(),new Map,new eu(q),n,r);await iN(e,s),e.ou=e.ou.remove(i),e._u.delete(t),iF(e)}else await rl(e.localStore,t,!1).then(()=>iV(e,t,n)).catch(et)}async function iD(e,t){var n;let r=t.batch.batchId;try{let i=await (n=e.localStore).persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{let r=t.batch.keys(),i=n.Cs.newChangeBuffer({trackRemovals:!0});return(function(e,t,n,r){let i=n.batch,s=i.keys(),a=en.resolve();return s.forEach(e=>{a=a.next(()=>r.getEntry(t,e)).next(t=>{let s=n.docVersions.get(e);A(null!==s,48541),0>t.version.compareTo(s)&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),a.next(()=>e.mutationQueue.removeMutationBatch(t,i))})(n,e,t,i).next(()=>i.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=tR();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))});iL(e,r,null),iR(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await iP(e,i)}catch(e){await et(e)}}async function ix(e,t,n){var r;try{let i=await (r=e.localStore).persistence.runTransaction("Reject batch","readwrite-primary",e=>{let n;return r.mutationQueue.lookupMutationBatch(e,t).next(t=>(A(null!==t,37113),n=t.keys(),r.mutationQueue.removeMutationBatch(e,t))).next(()=>r.mutationQueue.performConsistencyCheck(e)).next(()=>r.documentOverlayCache.removeOverlaysForBatchId(e,n,t)).next(()=>r.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,n)).next(()=>r.localDocuments.getDocuments(e,n))});iL(e,t,n),iR(e,t),e.sharedClientState.updateMutationState(t,"rejected",n),await iP(e,i)}catch(e){await et(e)}}function iR(e,t){(e.cu.get(t)||[]).forEach(e=>{e.resolve()}),e.cu.delete(t)}function iL(e,t,n){let r=e.uu[e.currentUser.toKey()];if(r){let i=r.get(t);i&&(n?i.reject(n):i.resolve(),r=r.remove(t)),e.uu[e.currentUser.toKey()]=r}}function iV(e,t,n=null){for(let r of(e.sharedClientState.removeLocalQueryTarget(t),e.iu.get(t)))e.ru.delete(r),n&&e.nu.Tu(r,n);e.iu.delete(t),e.isPrimaryClient&&e.au.Ur(t).forEach(t=>{e.au.containsKey(t)||iM(e,t)})}function iM(e,t){e.su.delete(t.path.canonicalString());let n=e.ou.get(t);null!==n&&(rP(e.remoteStore,n),e.ou=e.ou.remove(t),e._u.delete(n),iF(e))}function iO(e,t,n){for(let r of n)r instanceof id?(e.au.addReference(r.key,t),function(e,t){let n=t.key,r=n.path.canonicalString();e.ou.get(n)||e.su.has(r)||(_(ip,"New document in limbo: "+n),e.su.add(r),iF(e))}(e,r)):r instanceof im?(_(ip,"Document no longer in limbo: "+r.key),e.au.removeReference(r.key,t),e.au.containsKey(r.key)||iM(e,r.key)):C(19791,{Iu:r})}function iF(e){for(;e.su.size>0&&e.ou.size<e.maxConcurrentLimboResolutions;){let t=e.su.values().next().value;e.su.delete(t);let n=new X(W.fromString(t)),r=e.lu.next();e._u.set(r,new iv(n)),e.ou=e.ou.insert(n,r),rF(e.remoteStore,new nO(tp(new td(n.path)),r,"TargetPurposeLimboResolution",ei.le))}}async function iP(e,t,n){let r=[],i=[],s=[];e.ru.isEmpty()||(e.ru.forEach((a,o)=>{s.push(e.Pu(o,t,n).then(t=>{var s;if((t||n)&&e.isPrimaryClient){let r=t?!t.fromCache:null===(s=null==n?void 0:n.targetChanges.get(o.targetId))||void 0===s?void 0:s.current;e.sharedClientState.updateQueryState(o.targetId,r?"current":"not-current")}if(t){r.push(t);let e=rt.Ps(o.targetId,t);i.push(e)}}))}),await Promise.all(s),e.nu.Q_(r),await async function(e,t){try{await e.persistence.runTransaction("notifyLocalViewChanges","readwrite",n=>en.forEach(t,t=>en.forEach(t.ls,r=>e.persistence.referenceDelegate.addReference(n,t.targetId,r)).next(()=>en.forEach(t.hs,r=>e.persistence.referenceDelegate.removeReference(n,t.targetId,r)))))}catch(e){if(!er(e))throw e;_(ri,"Failed to update sequence numbers: "+e)}for(let n of t){let t=n.targetId;if(!n.fromCache){let n=e.Ss.get(t),r=n.snapshotVersion,i=n.withLastLimboFreeSnapshotVersion(r);e.Ss=e.Ss.insert(t,i)}}}(e.localStore,i))}async function iU(e,t){if(!e.currentUser.isEqual(t)){_(ip,"User change. New user:",t.toKey());let n=await ra(e.localStore,t);e.currentUser=t,e.cu.forEach(e=>{e.forEach(e=>{e.reject(new b(N.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))})}),e.cu.clear(),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await iP(e,n.Ms)}}function iq(e,t){let n=e._u.get(t);if(n&&n.tu)return tR().add(n.key);{let n=tR(),r=e.iu.get(t);if(!r)return n;for(let t of r){let r=e.ru.get(t);n=n.unionWith(r.view.Wa)}return n}}function i$(e){return e.remoteStore.remoteSyncer.applyRemoteEvent=iN.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=iq.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=ik.bind(null,e),e.nu.Q_=il.bind(null,e.eventManager),e.nu.Tu=iu.bind(null,e.eventManager),e}class iz{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=rC(e.databaseInfo.databaseId),this.sharedClientState=this.Au(e),this.persistence=this.Ru(e),await this.persistence.start(),this.localStore=this.Vu(e),this.gcScheduler=this.mu(e,this.localStore),this.indexBackfillerScheduler=this.fu(e,this.localStore)}mu(e,t){return null}fu(e,t){return null}Vu(e){var t;return t=this.persistence,new rs(t,new rr,e.initialUser,this.serializer)}Ru(e){return new n5(n7.Ei,this.serializer)}Au(e){return new rc}async terminate(){var e,t;null===(e=this.gcScheduler)||void 0===e||e.stop(),null===(t=this.indexBackfillerScheduler)||void 0===t||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}iz.provider={build:()=>new iz};class iB extends iz{constructor(e){super(),this.cacheSizeBytes=e}mu(e,t){return A(this.persistence.referenceDelegate instanceof re,46915),new nj(this.persistence.referenceDelegate.garbageCollector,e.asyncQueue,t)}Ru(e){let t=void 0!==this.cacheSizeBytes?nz.withCacheSize(this.cacheSizeBytes):nz.DEFAULT;return new n5(e=>re.Ei(e,t),this.serializer)}}class iK{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>ib(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=iU.bind(null,this.syncEngine),await r4(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new ii}createDatastore(e){let t=rC(e.databaseInfo.databaseId),n=new rT(e.databaseInfo);return new rx(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){var t;return t=this.localStore,new rV(t,this.datastore,e.asyncQueue,e=>ib(this.syncEngine,e,0),rm.C()?new rm:new rd)}createSyncEngine(e,t){return function(e,t,n,r,i,s,a){let o=new iw(e,t,n,r,i,s);return a&&(o.hu=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(e){_(rL,"RemoteStore shutting down."),e.aa.add(5),await rO(e),e.ca.shutdown(),e.la.set("Unknown")}(this.remoteStore),null===(e=this.datastore)||void 0===e||e.terminate(),null===(t=this.eventManager)||void 0===t||t.terminate()}}iK.provider={build:()=>new iK};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iG{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.pu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.pu(this.observer.error,e):E("Uncaught Error in snapshot listener:",e.toString()))}yu(){this.muted=!0}pu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let iQ="FirestoreClient";class ij{constructor(e,t,n,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=r,this.user=p.UNAUTHENTICATED,this.clientId=U.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async e=>{_(iQ,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(_(iQ,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new k;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){let t=r8(n,"Failed to shutdown persistence");e.reject(t)}}),e.promise}}async function iW(e,t){e.asyncQueue.verifyOperationInProgress(),_(iQ,"Initializing OfflineComponentProvider");let n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await ra(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function iH(e,t){e.asyncQueue.verifyOperationInProgress();let n=await iY(e);_(iQ,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>r3(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>r3(t.remoteStore,n)),e._onlineComponents=t}async function iY(e){if(!e._offlineComponents){if(e._uninitializedComponentsProvider){_(iQ,"Using user provided OfflineComponentProvider");try{await iW(e,e._uninitializedComponentsProvider._offline)}catch(t){if(!("FirebaseError"===t.name?t.code===N.FAILED_PRECONDITION||t.code===N.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&t instanceof DOMException)||22===t.code||20===t.code||11===t.code))throw t;T("Error using user provided cache. Falling back to memory cache: "+t),await iW(e,new iz)}}else _(iQ,"Using default OfflineComponentProvider"),await iW(e,new iB(void 0))}return e._offlineComponents}async function iX(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(_(iQ,"Using user provided OnlineComponentProvider"),await iH(e,e._uninitializedComponentsProvider._online)):(_(iQ,"Using default OnlineComponentProvider"),await iH(e,new iK))),e._onlineComponents}async function iJ(e){let t=await iX(e),n=t.eventManager;return n.onListen=i_.bind(null,t.syncEngine),n.onUnlisten=iC.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=iE.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=iS.bind(null,t.syncEngine),n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iZ(e){let t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let i0=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function i1(e,t,n){if(!n)throw new b(N.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function i2(e){if(!X.isDocumentKey(e))throw new b(N.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function i3(e){if(X.isDocumentKey(e))throw new b(N.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function i4(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{var t;let n=(t=e).constructor?t.constructor.name:null;return n?`a custom ${n} object`:"an object"}}return"function"==typeof e?"a function":C(12329,{type:typeof e})}function i9(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new b(N.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let n=i4(e);throw new b(N.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let i6="firestore.googleapis.com";class i5{constructor(e){var t,n;if(void 0===e.host){if(void 0!==e.ssl)throw new b(N.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=i6,this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new b(N.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,n,r){if(!0===t&&!0===r)throw new b(N.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=iZ(null!==(n=e.experimentalLongPollingOptions)&&void 0!==n?n:{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new b(N.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new b(N.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new b(N.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){var t,n;return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,n=e.experimentalLongPollingOptions,t.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class i8{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new i5({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new b(N.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new b(N.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new i5(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new x;switch(e.type){case"firstParty":return new M(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new b(N.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=i0.get(e);t&&(_("ComponentProvider","Removing Datastore"),i0.delete(e),t.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i7{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new i7(this.firestore,e,this._query)}}class se{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new st(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new se(this.firestore,e,this._key)}}class st extends i7{constructor(e,t,n){super(e,t,new td(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new se(this.firestore,null,new X(e))}withConverter(e){return new st(this.firestore,e,this._path)}}function sn(e,t,...n){if(e=(0,h.m9)(e),i1("collection","path",t),e instanceof i8){let r=W.fromString(t,...n);return i3(r),new st(e,null,r)}{if(!(e instanceof se||e instanceof st))throw new b(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=e._path.child(W.fromString(t,...n));return i3(r),new st(e.firestore,null,r)}}function sr(e,t,...n){if(e=(0,h.m9)(e),1==arguments.length&&(t=U.newId()),i1("doc","path",t),e instanceof i8){let r=W.fromString(t,...n);return i2(r),new se(e,null,new X(r))}{if(!(e instanceof se||e instanceof st))throw new b(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=e._path.child(W.fromString(t,...n));return i2(r),new se(e.firestore,e instanceof st?e.converter:null,new X(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let si="AsyncQueue";class ss{constructor(e=Promise.resolve()){this.Qu=[],this.$u=!1,this.Uu=[],this.Ku=null,this.Wu=!1,this.Gu=!1,this.zu=[],this.y_=new rS(this,"async_queue_retry"),this.ju=()=>{let e=rI();e&&_(si,"Visibility state changed to "+e.visibilityState),this.y_.A_()},this.Hu=e;let t=rI();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.ju)}get isShuttingDown(){return this.$u}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Ju(),this.Yu(e)}enterRestrictedMode(e){if(!this.$u){this.$u=!0,this.Gu=e||!1;let t=rI();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.ju)}}enqueue(e){if(this.Ju(),this.$u)return new Promise(()=>{});let t=new k;return this.Yu(()=>this.$u&&this.Gu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Qu.push(e),this.Zu()))}async Zu(){if(0!==this.Qu.length){try{await this.Qu[0](),this.Qu.shift(),this.y_.reset()}catch(e){if(!er(e))throw e;_(si,"Operation failed with retryable error: "+e)}this.Qu.length>0&&this.y_.E_(()=>this.Zu())}}Yu(e){let t=this.Hu.then(()=>(this.Wu=!0,e().catch(e=>{throw this.Ku=e,this.Wu=!1,E("INTERNAL UNHANDLED ERROR: ",sa(e)),e}).then(e=>(this.Wu=!1,e))));return this.Hu=t,t}enqueueAfterDelay(e,t,n){this.Ju(),this.zu.indexOf(e)>-1&&(t=0);let r=r5.createAndSchedule(this,e,t,n,e=>this.Xu(e));return this.Uu.push(r),r}Ju(){this.Ku&&C(47125,{ec:sa(this.Ku)})}verifyOperationInProgress(){}async tc(){let e;do e=this.Hu,await e;while(e!==this.Hu)}nc(e){for(let t of this.Uu)if(t.timerId===e)return!0;return!1}rc(e){return this.tc().then(()=>{for(let t of(this.Uu.sort((e,t)=>e.targetTimeMs-t.targetTimeMs),this.Uu))if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.tc()})}sc(e){this.zu.push(e)}Xu(e){let t=this.Uu.indexOf(e);this.Uu.splice(t,1)}}function sa(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}class so extends i8{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new ss,this._persistenceKey=(null==r?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new ss(e),this._firestoreClient=void 0,await e}}}function sl(e,t){let n="object"==typeof e?e:(0,o.Mq)(),r=(0,o.qX)(n,"firestore").getImmediate({identifier:"string"==typeof e?e:t||ek});if(!r._initialized){let e=(0,h.P0)("firestore");e&&function(e,t,n,r={}){var i;let s=(e=i9(e,i8))._getSettings(),a=Object.assign(Object.assign({},s),{emulatorOptions:e._getEmulatorOptions()}),o=`${t}:${n}`;s.host!==i6&&s.host!==o&&T("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let l=Object.assign(Object.assign({},s),{host:o,ssl:!1,emulatorOptions:r});if(!(0,h.vZ)(l,a)&&(e._setSettings(l),r.mockUserToken)){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=p.MOCK_USER;else{t=(0,h.Sg)(r.mockUserToken,null===(i=e._app)||void 0===i?void 0:i.options.projectId);let s=r.mockUserToken.sub||r.mockUserToken.user_id;if(!s)throw new b(N.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new p(s)}e._authCredentials=new R(new D(t,n))}}(r,...e)}return r}function su(e){if(e._terminated)throw new b(N.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||function(e){var t,n,r,i;let s=e._freezeSettings(),a=(i=e._databaseId,new eb(i,(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",e._persistenceKey,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,iZ(s.experimentalLongPollingOptions),s.useFetchStreams));e._componentsProvider||(null===(n=s.localCache)||void 0===n?void 0:n._offlineComponentProvider)&&(null===(r=s.localCache)||void 0===r?void 0:r._onlineComponentProvider)&&(e._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),e._firestoreClient=new ij(e._authCredentials,e._appCheckCredentials,e._queue,a,e._componentsProvider&&function(e){let t=null==e?void 0:e._online.build();return{_offline:null==e?void 0:e._offline.build(t),_online:t}}(e._componentsProvider))}(e),e._firestoreClient}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sh{constructor(e){this._byteString=e}static fromBase64String(e){try{return new sh(ep.fromBase64String(e))}catch(e){throw new b(N.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new sh(ep.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new b(N.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Y(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sd{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new b(N.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new b(N.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return q(this._lat,e._lat)||q(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sm{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sg=/^__.*__$/;class sp{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new t1(e,this.data,this.fieldMask,t,this.fieldTransforms):new t0(e,this.data,t,this.fieldTransforms)}}class sy{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new t1(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function sv(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw C(40011,{oc:e})}}class sw{constructor(e,t,n,r,i,s){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===i&&this._c(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get oc(){return this.settings.oc}ac(e){return new sw(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}uc(e){var t;let n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.ac({path:n,cc:!1});return r.lc(e),r}hc(e){var t;let n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.ac({path:n,cc:!1});return r._c(),r}Pc(e){return this.ac({path:void 0,cc:!0})}Tc(e){return sR(e,this.settings.methodName,this.settings.Ic||!1,this.path,this.settings.Ec)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}_c(){if(this.path)for(let e=0;e<this.path.length;e++)this.lc(this.path.get(e))}lc(e){if(0===e.length)throw this.Tc("Document fields must not be empty");if(sv(this.oc)&&sg.test(e))throw this.Tc('Document fields cannot begin and end with "__"')}}class s_{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||rC(e)}dc(e,t,n,r=!1){return new sw({oc:e,methodName:t,Ec:n,path:Y.emptyPath(),cc:!1,Ic:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function sE(e){let t=e._freezeSettings(),n=rC(e._databaseId);return new s_(e._databaseId,!!t.ignoreUndefinedProperties,n)}function sT(e,t,n,r,i,s={}){let a,o;let l=e.dc(s.merge||s.mergeFields?2:0,t,n,i);sb("Data must be an object, but it was:",l,r);let u=sA(r,l);if(s.merge)a=new em(l.fieldMask),o=l.fieldTransforms;else if(s.mergeFields){let e=[];for(let r of s.mergeFields){let i=sk(t,r,n);if(!l.contains(i))throw new b(N.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);sL(e,i)||e.push(i)}a=new em(e),o=l.fieldTransforms.filter(e=>a.covers(e.field))}else a=null,o=l.fieldTransforms;return new sp(new eJ(u),a,o)}class sI extends sd{_toFieldTransform(e){if(2!==e.oc)throw 1===e.oc?e.Tc(`${this._methodName}() can only appear at the top level of your update data`):e.Tc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof sI}}class sC extends sd{_toFieldTransform(e){return new tQ(e.path,new tP)}isEqual(e){return e instanceof sC}}function sS(e,t){if(sN(e=(0,h.m9)(e)))return sb("Unsupported field value:",t,e),sA(e,t);if(e instanceof sd)return function(e,t){if(!sv(t.oc))throw t.Tc(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Tc(`${e._methodName}() is not currently supported inside arrays`);let n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.cc&&4!==t.oc)throw t.Tc("Nested arrays are not supported");return function(e,t){let n=[],r=0;for(let i of e){let e=sS(i,t.Pc(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){var n,r,i;if(null===(e=(0,h.m9)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return n=t.serializer,"number"==typeof(i=r=e)&&Number.isInteger(i)&&!es(i)&&i<=Number.MAX_SAFE_INTEGER&&i>=Number.MIN_SAFE_INTEGER?tM(r):tV(n,r);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){let n=K.fromDate(e);return{timestampValue:nE(t.serializer,n)}}if(e instanceof K){let n=new K(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:nE(t.serializer,n)}}if(e instanceof sf)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof sh)return{bytesValue:nT(t.serializer,e._byteString)};if(e instanceof se){let n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.Tc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:nC(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof sm)return{mapValue:{fields:{[ex]:{stringValue:eV},[eM]:{arrayValue:{values:e.toArray().map(e=>{if("number"!=typeof e)throw t.Tc("VectorValues must only contain numeric values.");return tV(t.serializer,e)})}}}}};throw t.Tc(`Unsupported field value: ${i4(e)}`)}(e,t)}function sA(e,t){let n={};return el(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):eo(e,(e,r)=>{let i=sS(r,t.uc(e));null!=i&&(n[e]=i)}),{mapValue:{fields:n}}}function sN(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof K||e instanceof sf||e instanceof sh||e instanceof se||e instanceof sd||e instanceof sm)}function sb(e,t,n){if(!sN(n)||!("object"==typeof n&&null!==n&&(Object.getPrototypeOf(n)===Object.prototype||null===Object.getPrototypeOf(n)))){let r=i4(n);throw"an object"===r?t.Tc(e+" a custom object"):t.Tc(e+" "+r)}}function sk(e,t,n){if((t=(0,h.m9)(t))instanceof sc)return t._internalPath;if("string"==typeof t)return sx(e,t);throw sR("Field path arguments must be of type string or ",e,!1,void 0,n)}let sD=RegExp("[~\\*/\\[\\]]");function sx(e,t,n){if(t.search(sD)>=0)throw sR(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new sc(...t.split("."))._internalPath}catch(r){throw sR(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function sR(e,t,n,r,i){let s=r&&!r.isEmpty(),a=void 0!==i,o=`Function ${t}() called with invalid data`;n&&(o+=" (via `toFirestore()`)"),o+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=` in field ${r}`),a&&(l+=` in document ${i}`),l+=")"),new b(N.INVALID_ARGUMENT,o+e+l)}function sL(e,t){return e.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sV{constructor(e,t,n,r,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new se(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){let e=new sM(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(sO("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class sM extends sV{data(){return super.data()}}function sO(e,t){return"string"==typeof t?sx(e,t):t instanceof sc?t._internalPath:t._delegate._internalPath}class sF{}class sP extends sF{}function sU(e,t,...n){let r=[];for(let i of(t instanceof sF&&r.push(t),function(e){let t=e.filter(e=>e instanceof sz).length,n=e.filter(e=>e instanceof sq).length;if(t>1||t>0&&n>0)throw new b(N.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r=r.concat(n)),r))e=i._apply(e);return e}class sq extends sP{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new sq(e,t,n)}_apply(e){let t=this._parse(e);return sH(e._query,t),new i7(e.firestore,e.converter,ty(e._query,t))}_parse(e){let t=sE(e.firestore);return function(e,t,n,r,i,s,a){let o;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new b(N.INVALID_ARGUMENT,`Invalid Query. You can't perform '${s}' queries on documentId().`);if("in"===s||"not-in"===s){sW(a,s);let t=[];for(let n of a)t.push(sj(r,e,n));o={arrayValue:{values:t}}}else o=sj(r,e,a)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||sW(a,s),o=function(e,t,n,r=!1){return sS(n,e.dc(r?4:3,t))}(n,t,a,"in"===s||"not-in"===s);return e9.create(i,s,o)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function s$(e,t,n){let r=sO("where",e);return sq._create(r,t,n)}class sz extends sF{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new sz(e,t)}_parse(e){let t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:e6.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;for(let e of t.getFlattenedFilters())sH(n,e),n=ty(n,e)}(e._query,t),new i7(e.firestore,e.converter,ty(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class sB extends sP{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new sB(e,t)}_apply(e){let t=function(e,t,n){if(null!==e.startAt)throw new b(N.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new b(N.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new e3(t,n)}(e._query,this._field,this._direction);return new i7(e.firestore,e.converter,function(e,t){let n=e.explicitOrderBy.concat([t]);return new td(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function sK(e,t="asc"){let n=sO("orderBy",e);return sB._create(n,t)}class sG extends sP{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new sG(e,t,n)}_apply(e){return new i7(e.firestore,e.converter,tv(e._query,this._limit,this._limitType))}}function sQ(e){return function(e,t){if(t<=0)throw new b(N.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}("limit",e),sG._create("limit",e,"F")}function sj(e,t,n){if("string"==typeof(n=(0,h.m9)(n))){if(""===n)throw new b(N.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!tm(t)&&-1!==n.indexOf("/"))throw new b(N.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);let r=t.path.child(W.fromString(n));if(!X.isDocumentKey(r))throw new b(N.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return eB(e,new X(r))}if(n instanceof se)return eB(e,n._key);throw new b(N.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${i4(n)}.`)}function sW(e,t){if(!Array.isArray(e)||0===e.length)throw new b(N.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function sH(e,t){let n=function(e,t){for(let n of e)for(let e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new b(N.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new b(N.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}class sY{convertValue(e,t="none"){switch(eO(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ew(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(e_(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw C(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let n={};return eo(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertVectorValue(e){var t,n,r;return new sm(null===(r=null===(n=null===(t=e.fields)||void 0===t?void 0:t[eM].arrayValue)||void 0===n?void 0:n.values)||void 0===r?void 0:r.map(e=>ew(e.doubleValue)))}convertGeoPoint(e){return new sf(ew(e.latitude),ew(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":let n=eA(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(eN(e));default:return null}}convertTimestamp(e){let t=ev(e);return new K(t.seconds,t.nanos)}convertDocumentKey(e,t){let n=W.fromString(e);A(nM(n),9688,{name:e});let r=new eD(n.get(1),n.get(3)),i=new X(n.popFirst(5));return r.isEqual(t)||E(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sX(e,t,n){return e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sJ{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class sZ extends sV{constructor(e,t,n,r,i,s){super(e,t,n,r,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new s0(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let n=this._document.data.field(sO("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class s0 extends sZ{data(e={}){return super.data(e)}}class s1{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new sJ(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new s0(this._firestore,this._userDataWriter,n.key,n,new sJ(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new b(N.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{let r=new s0(e._firestore,e._userDataWriter,n.doc.key,n.doc,new sJ(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{let r=new s0(e._firestore,e._userDataWriter,t.doc.key,t.doc,new sJ(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter),i=-1,s=-1;return 0!==t.type&&(i=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(s=(n=n.add(t.doc)).indexOf(t.doc.key)),{type:function(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return C(61501,{type:e})}}(t.type),doc:r,oldIndex:i,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function s2(e){e=i9(e,se);let t=i9(e.firestore,so);return(function(e,t,n={}){let r=new k;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,n,r,i){let s=new iG({next:o=>{s.yu(),t.enqueueAndForget(()=>io(e,a));let l=o.docs.has(n);!l&&o.fromCache?i.reject(new b(N.UNAVAILABLE,"Failed to get document because the client is offline.")):l&&o.fromCache&&r&&"server"===r.source?i.reject(new b(N.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(o)},error:e=>i.reject(e)}),a=new ic(new td(n.path),s,{includeMetadataChanges:!0,Fa:!0});return ia(e,a)})(await iJ(e),e.asyncQueue,t,n,r)),r.promise})(su(t),e._key).then(n=>(function(e,t,n){let r=n.docs.get(t._key),i=new s3(e);return new sZ(e,i,t._key,r,new sJ(n.hasPendingWrites,n.fromCache),t.converter)})(t,e,n))}class s3 extends sY{constructor(e){super(),this.firestore=e}convertBytes(e){return new sh(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new se(this.firestore,null,t)}}function s4(e){e=i9(e,i7);let t=i9(e.firestore,so),n=su(t),r=new s3(t);return(/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new b(N.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}(e._query),(function(e,t,n={}){let r=new k;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,n,r,i){let s=new iG({next:n=>{s.yu(),t.enqueueAndForget(()=>io(e,a)),n.fromCache&&"server"===r.source?i.reject(new b(N.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(n)},error:e=>i.reject(e)}),a=new ic(n,s,{includeMetadataChanges:!0,Fa:!0});return ia(e,a)})(await iJ(e),e.asyncQueue,t,n,r)),r.promise})(n,e._query).then(n=>new s1(t,r,e,n)))}function s9(e,t,n){e=i9(e,se);let r=i9(e.firestore,so),i=sX(e.converter,t,n);return s7(r,[sT(sE(r),"setDoc",e._key,i,null!==e.converter,n).toMutation(e._key,tW.none())])}function s6(e,t,n,...r){e=i9(e,se);let i=i9(e.firestore,so),s=sE(i);return s7(i,[("string"==typeof(t=(0,h.m9)(t))||t instanceof sc?function(e,t,n,r,i,s){let a=e.dc(1,t,n),o=[sk(t,r,n)],l=[i];if(s.length%2!=0)throw new b(N.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<s.length;e+=2)o.push(sk(t,s[e])),l.push(s[e+1]);let u=[],c=eJ.empty();for(let e=o.length-1;e>=0;--e)if(!sL(u,o[e])){let t=o[e],n=l[e];n=(0,h.m9)(n);let r=a.hc(t);if(n instanceof sI)u.push(t);else{let e=sS(n,r);null!=e&&(u.push(t),c.set(t,e))}}return new sy(c,new em(u),a.fieldTransforms)}(s,"updateDoc",e._key,t,n,r):function(e,t,n,r){let i=e.dc(1,t,n);sb("Data must be an object, but it was:",i,r);let s=[],a=eJ.empty();return eo(r,(e,r)=>{let o=sx(t,e,n);r=(0,h.m9)(r);let l=i.hc(o);if(r instanceof sI)s.push(o);else{let e=sS(r,l);null!=e&&(s.push(o),a.set(o,e))}}),new sy(a,new em(s),i.fieldTransforms)}(s,"updateDoc",e._key,t)).toMutation(e._key,tW.exists(!0))])}function s5(e){return s7(i9(e.firestore,so),[new t9(e._key,tW.none())])}function s8(e,t){let n=i9(e.firestore,so),r=sr(e),i=sX(e.converter,t);return s7(n,[sT(sE(e.firestore),"addDoc",r._key,i,null!==e.converter,{}).toMutation(r._key,tW.exists(!1))]).then(()=>r)}function s7(e,t){return function(e,t){let n=new k;return e.asyncQueue.enqueueAndForget(async()=>iA(await iX(e).then(e=>e.syncEngine),t,n)),n.promise}(su(e),t)}function ae(){return new sC("serverTimestamp")}new WeakMap,function(e=!0){y=o.Jn,(0,o.Xd)(new l.wA("firestore",(t,{instanceIdentifier:n,options:r})=>{let i=t.getProvider("app").getImmediate(),s=new so(new L(t.getProvider("auth-internal")),new F(i,t.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new b(N.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new eD(e.options.projectId,t)}(i,n),i);return r=Object.assign({useFetchStreams:e},r),s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),(0,o.KN)(m,g,void 0),(0,o.KN)(m,g,"esm2017")}()}}]);