==== Prerequisites

* SWI Prolog

==== How to make modifications to grammar:

* Change EBNF of sparql11-grammar.pl file (i.e., do not change the `_tokenizer-table.js` file!)
* Run `./build.sh`
* Finally, rebuild SGE from the SGE home dir by running `gulp`
