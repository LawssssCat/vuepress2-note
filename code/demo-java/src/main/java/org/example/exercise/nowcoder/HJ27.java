package org.example.exercise.nowcoder;

import java.util.Scanner;

/**
 * <a href="https://www.nowcoder.com/practice/03ba8aeeef73400ca7a37a5f3370fe68?tpId=37&tqId=21250&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta">HJ27 查找兄弟单词</a>
 * 定义一个单词的“兄弟单词”为：交换该单词字母顺序（注：可以交换任意次），而不添加、删除、修改原有的字母就能生成的单词。
 * 兄弟单词要求和原来的单词不同。例如： ab 和 ba 是兄弟单词。 ab 和 ab 则不是兄弟单词。
 * 现在给定你 n 个单词，另外再给你一个单词 x ，让你寻找 x 的兄弟单词里，按字典序排列后的第 k 个单词是什么？
 * 注意：字典中可能有重复单词。
 * 数据范围： 1≤n≤1000 ，输入的字符串长度满足 1≤len(str)≤10，1≤k<n
 */
public class HJ27 {
    public static void main(String[] args) {
        /*
         2
         bca
         */
        System.out.println(xx("3 abc bca cab abc 1"));
        /*
        3
        bca
         */
        System.out.println(xx("6 cab ad abcd cba abc bca abc 1"));
        /*
        6
        adbcb
         */
        System.out.println(xx("473 bb daccb caddd bddc c baa adb ad abbcb cdaa abab a abcc ddcbd cadcc cdacd aaa a b acccd bbb dacc cc acbdd bcbb ba bacaa adda acd aaad d ab acac bc dabab abcd aacba aba daa bb ad cddab a bbaa aacad cdac acbcc cada bacd adcad cdadc bcbcc aa b acd cbaac ddcd ccb dac a dac adbcb bcda dda a ab ca dd d abd a dbb ccabd bdddd abd adc aaa baccb ccdcd a da c cadc dcdbd d aa bb a cac c ad adb ca cdcc cadd dddca d cba cb caab caa dd cd bca abc cdaa cdb bad dad bda d ddbc dab baaa adaac b a dbccd bd b bdad cdacd baa ac ddcad d bb acc aa cd cbdbb bbbcb a cc aacc c aadc dbcd a bca dd abbb ccdcd ccd ab d a a dadcd dbd bcaa c cda b ddab caaaa cdcdb b acbc ccaa dabca dcd b ba dbcc da bdbcc ab abaca bb cddc caca da dadba accdd bdac dbcd bcbbd ab bd ccb ddaa aa b b d bddd cabac aaba ab ccdb db abbd ada bdadb c abba dd cdb bca cccda badba abaa ac aabad db ccbad bddd ada dba acba b bc dd bbbbd cc cbdd cd abcaa bb ddaca acadb bbbb bddcc bdada aaa bcbda c aaa aadd cdddc adb cdbab c cbca bb aacab acdb bbdab b acbda cbdcd bda bacdc db d adcbd bccc c aaa cdd bdcd bac a aaab ddbb cd ccdbb addcc cdc c ca baadc addba dbdbd dba bbdda bcb c cdad aacac dcada cb aaad a cccab caca aad bbb dd b babbb cba bdaca db bacd bc bcbda cdda bcccd bdcda bdbcd adb cbcb a c bacba abbb adab adab b b d bca badbc baa cdb b abc aabb b d c cdab cacda d cdcda adcdc bcc bbccd b adb caba cbaaa aadb dcc add bcac bacbd bb a b c cabaa c caad c aa bcc ccab ddc dadca cdcba aaba dabbd dcb a bddb bb a c c cbc ccd dd a cabbb b caadb cb dca cbb ddaa bcadc dab a bbda cd bc ccad bbd ab c acddd cdd dbbbb daaab abbb cabc add ca caa bbbb dcab daaaa baca dcd ccacb ba bddaa acac dbcc bcc cbbcc b abba daa dbab bcca ba aa d dcdc d dcaa cbcda bd b ccbcb baa dcacd d c cbda baba d abb c cbdc da dbbb cd aabc dadc b a ddb c ddd ccdc ccd cba dbaac dcccd ddbac dbbdd bad bcdd cb dac dccd d a acdd d c cb b bcbb c a aca bcba d d bbdbc d c dabad ccca dc adb ddb dcdd dba ad ddaba c ac ddac bbbd cd a dacbb 1"));
        /*
        1
         */
        System.out.println(xx("476 cb cba baad cbdb bdb acacd aba b cbbc b ccd d ddb acdab bab acc bc dccab bb daa cdcc dc adcab bd bbcab abc ba dd bdb dbbc ddbcd ab cc a c accb ddd cbc adb aad badd ad bac a addcb bcab d ccd b bc cdc acac adad d c ddc aba cac db dc aadbd bc cad baaa aaa d cddcc dabaa daa dcaac d db bab dbbbc cd acaab abbdc cda dddad a dbda cba cd dda bcca ccaca adbb bad c ba a ca d aca b bbdd dad bbcd abbcb ac aabac ca b ac dbbab bba bdcc cacbb bd a cbba badad ab ccda b c abcdc d bdab cbc ad dbcc bbddc ba caa ccac aadaa daad aacc dc dcb bca ab ccdda d cbbcc da ac b dcdba a adac ab dcc adac dd c bd bcd c ccbb dba abcb b cddc ccada dada dcca ddbbd c bda bac b bdbb bbba bdaa dda ac dd dcbbd ddccc badd adddd cba b b bbcab bcac bdad a adbd da ac adbbb cbbb caadb ab dc bdbc d c adb ab aadbd abad aaadc adcc b bbadd bbbc da acbb cbbdb bcdcc a bc ddba abadd ddc ada b bbcdc a bbccb bb a b cdac aab d dadad bad aabb dccba cd d cda b add dcacc bccdc add dc a cccd b aa ac dacbc a badb b dabbc b ddb acc c c a bc bc bcc dadc dad bba cbd b aa cbb a ababc da bc dcbcc dcbb aaad bdac ddbc bbbb bdbca d a cadac aaa dcd cc b dccba aadbd ddbbc aadb bca dcdcc a d c d b dbc abddb ccadb ccca ddda cd bbda adc ba bab adadb aaaa dbac abac acbb a cbd a dbdcd cdc c daaba a bc dabb bc aaadc b bdcc baaa addb ad dbdca cbb cbdd dc d dcbb bdd dca cad ddd cdbdd ca d c cd ddcda badb ab ba bc dcd add cc bb d dcda bbc abdb bd ba abcb d c ddaab cbbc cad bdb ba ba dbdcb dcddb dd cbdc cdd b cbcdb add bba bcaba d aba d cbcba bacb a abbca cdabc bdaa dbd bd ddc bacc bbcdc c bdbbb dd b cdc ba daaba ab b caac baad dcaca cda cbc cbdba bd dbbba aad b bbbba bbdc cdbb abc ddaa d c c bcd dcb adabd c bbc bb cd bccc ac d bbb cbd ad aad bcbaa bda ad d badba a a aa abacc cd bbbc d b ccbb dccad a ac bcbc bddc ddcad ddcb dd a dacb dddad dcb ac add ddc aa cc b ad baccb cda cbbdd adab abbdb c d bcb b ca cbdbd abbc dc abd bac bab bbb bcab cdaab bbaa 3"));
    }

    /**
     * @param input 输入只有一行。 先输入字典中单词的个数n，再输入n个单词作为字典单词。 然后输入一个单词x 最后后输入一个整数k
     * @return 第一行输出查找到x的兄弟单词的个数m 第二行输出查找到的按照字典顺序排序后的第k个兄弟单词，没有符合第k个的话则不用输出。
     */
    private static String xx(String input) {
        Scanner in = new Scanner(input);

        String[] T = in.nextLine().split(" ");
        int n = Integer.parseInt(T[0]);
        String[] S = new String[n];
        for(int i=0; i<n; i++) {
            S[i] = T[i+1];
        }
        String x = T[n+1];
        int k = Integer.parseInt(T[n+2]);
        //
        int count = 0;
        for(int i=0; i<n; i++) {
            if(isBrother(S[i], x)) {
                count++;
            } else {
                S[i] = null;
            }
        }
        // bubble
        n = n;
        boolean swapped;
        do {
            swapped = false;
            for(int i=1; i<n; i++) {
                if(S[i-1]==null || (S[i]!=null && S[i-1].compareTo(S[i])>0)) {
                    String t = S[i];
                    S[i] = S[i-1];
                    S[i-1] = t;
                    swapped = true;
                }
            }
            n--;
        } while(swapped);
        //
        StringBuilder sb = new StringBuilder();
        sb.append(count).append("\n");
        if(S[k-1]!=null) sb.append(S[k-1]);
        return sb.toString();
    }

    private static boolean isBrother(String a, String b) {
        if(a.length()!=b.length()) {
            return false;
        }
        if(a.equals(b)) {
            return false;
        }
        int[] temp = new int[128];
        int[] temp1 = new int[128];
        for(int i=0; i<a.length(); i++) {
            temp[a.charAt(i)]++;
            temp1[b.charAt(i)]++;
        }
        for(int i=0; i<temp.length;i++) {
            if(temp[i] != temp1[i]) return false;
        }
        return true;
    }
}
